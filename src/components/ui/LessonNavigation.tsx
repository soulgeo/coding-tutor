import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lesson } from "../../data/courseData";
import { useMemo, useState, useEffect } from "react";
import { useUnits } from "../../context/UnitContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  unitId?: string;
  lessonId?: string;
  currentLesson: Lesson;
}

const LessonNavigation = ({ unitId, lessonId, currentLesson }: Props) => {
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

  return (
    <div className="flex flex-row justify-end items-center w-full px-4 gap-2">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-sm md:btn-md normal-case"
        >
          <span className="hidden md:inline">U{currentUnitNumber}:</span>{" "}
          {units?.[unitId || ""]?.name || "Loading..."}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-72 p-2 shadow mt-2"
        >
          {sortedUnitIds.map((uId, index) => (
            <li key={uId}>
              <Link
                to={`/units/${uId}/lessons/${units![uId].lessons[0]}`}
                className={uId === unitId ? "active" : ""}
              >
                U{index + 1}: {units![uId].name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-sm md:btn-md normal-case"
        >
          <span className="hidden md:inline">
            L{currentLessonNumber}:
          </span>{" "}
          {currentLesson.title}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-50 w-72 p-2 shadow mt-2 max-h-96 overflow-y-auto"
        >
          {lessonsInUnit.map((l, index) => (
            <li key={l.id}>
              <Link
                to={`/units/${unitId}/lessons/${l.id}`}
                className={l.id === lessonId ? "active" : ""}
              >
                L{index + 1}: {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-row gap-2 ml-2">
        {prevLink ? (
          <Link
            to={prevLink}
            className="btn btn-primary btn-circle btn-sm md:btn-md"
          >
            <ChevronLeft size={20} />
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-circle btn-sm md:btn-md btn-disabled"
            disabled
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {nextLink ? (
          <Link
            to={nextLink}
            className="btn btn-primary btn-circle btn-sm md:btn-md"
          >
            <ChevronRight size={20} />
          </Link>
        ) : (
          <button
            className="btn btn-primary btn-circle btn-sm md:btn-md btn-disabled"
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
