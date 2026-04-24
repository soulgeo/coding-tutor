import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lesson } from "../../data/courseData";
import { useMemo, useState, useEffect } from "react";
import { useUnits } from "../../context/UnitContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import NavDropdown from "./NavDropdown";
import 'animate.css';

interface Props {
  unitId?: string;
  lessonId?: string;
  currentLesson: Lesson;
  isCompleted: boolean;
}

const LessonNavigation = ({ unitId, lessonId, currentLesson, isCompleted }: Props) => {
  const { units } = useUnits();
  const [lessonsInUnit, setLessonsInUnit] = useState<
    { id: string; title: string }[]
  >([]);

  useEffect(() => {
    if (!unitId || !units || !units[unitId]) return;

    let active = true;
    const fetchLessonTitles = async () => {
      const lessonIds = units[unitId].lessons;
      const titlesPromises = lessonIds.map(async (lId) => {
        const d = await getDoc(doc(db, "lessons", lId));
        return { id: lId, title: (d.data() as Lesson)?.title || lId };
      });
      const results = await Promise.all(titlesPromises);
      if (active) {
        setLessonsInUnit(results);
      }
    };

    fetchLessonTitles();
    return () => {
      active = false;
    };
  }, [unitId, units]);

  const navigation = useMemo(() => {
    if (!units || !unitId || !lessonId) return { prevLink: "", nextLink: "" };

    const sortedUnitIds = Object.keys(units).sort();
    const flatLessons = sortedUnitIds.flatMap((uId) =>
      units[uId].lessons.map((lId) => ({ unitId: uId, lessonId: lId })),
    );

    const currentIndex = flatLessons.findIndex(
      (l) => l.lessonId === lessonId && l.unitId === unitId,
    );

    let prevLink = "";
    let nextLink = "";

    if (currentIndex > 0) {
      const prev = flatLessons[currentIndex - 1];
      prevLink = `/units/${prev.unitId}/lessons/${prev.lessonId}`;
    }

    if (currentIndex !== -1 && currentIndex < flatLessons.length - 1) {
      const next = flatLessons[currentIndex + 1];
      nextLink = `/units/${next.unitId}/lessons/${next.lessonId}`;
    }

    return { prevLink, nextLink };
  }, [units, unitId, lessonId]);

  const sortedUnitIds = useMemo(() => Object.keys(units || {}).sort(), [units]);
  const currentUnitNumber = sortedUnitIds.indexOf(unitId || "") + 1;
  const currentLessonNumber =
    (units?.[unitId || ""]?.lessons.indexOf(lessonId || "") ?? -1) + 1;

  const { prevLink, nextLink } = navigation;

  const unitDropdownItems = sortedUnitIds.map((uId, index) => ({
    to: `/units/${uId}/lessons/${units![uId].lessons[0]}`,
    label: `U${index + 1}: ${units![uId].name}`,
    isActive: uId === unitId,
  }));

  const lessonDropdownItems = lessonsInUnit.map((l, index) => ({
    to: `/units/${unitId}/lessons/${l.id}`,
    label: `L${index + 1}: ${l.title}`,
    isActive: l.id === lessonId,
  }));

  return (
    <div className="flex flex-row justify-end items-center gap-2">
      <NavDropdown
        dropdownClassName="ml-4"
        buttonLabel={
          <>
            U{currentUnitNumber}: {units?.[unitId || ""]?.name || "Loading..."}
          </>
        }
        items={unitDropdownItems}
      />

      <NavDropdown
        dropdownClassName="hidden xl:inline-block"
        buttonLabel={
          <>
            <span className="hidden md:inline">L{currentLessonNumber}:</span>{" "}
            {currentLesson.title}
          </>
        }
        items={lessonDropdownItems}
      />

      <div className="flex flex-row gap-3 ml-2">
        {prevLink ? (
          <Link
            to={prevLink}
            className="btn btn-primary btn-circle btn-sm md:btn-md w-15"
          >
            <ChevronLeft size={20} />
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-circle btn-sm md:btn-md btn-disabled w-15"
            disabled
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {nextLink ? (
          <Link
            to={nextLink}
            className={`btn ${isCompleted ? "btn-accent animate__animated animate__headShake" : "btn-primary"} btn-circle btn-sm md:btn-md w-15`}
          >
            <ChevronRight size={20} />
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-circle btn-sm md:btn-md btn-disabled w-15"
            disabled
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonNavigation;
