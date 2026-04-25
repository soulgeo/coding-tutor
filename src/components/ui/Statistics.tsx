import { useEffect, useState } from "react";
import type { Unit } from "../../data/courseData";
import type { UserData } from "../../data/userData";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router";

interface Props {
  userData: UserData;
  units: Record<string, Unit>;
}

const Statistics = ({ userData, units }: Props) => {
  const [mostChallengingLessonTitle, setMostChallengingLessonTitle] =
    useState<string>("");
  const [mostChallengingUnitId, setMostChallengingUnitId] =
    useState<string>("");

  let totalLessons = 0;
  let completedLessonsCount = 0;
  let totalFailedAttempts = 0;
  let unitsCompleted = 0;
  let mostChallengingLessonId = "None";
  let maxFailedAttempts = 0;

  Object.entries(units).forEach(([unitId, unit]) => {
    totalLessons += unit.lessons.length;
    const progress = userData.unitsProgress[unitId];
    if (progress && progress.completedLessons.length === unit.lessons.length) {
      unitsCompleted++;
    }
  });

  Object.values(userData.unitsProgress).forEach((progress) => {
    completedLessonsCount += progress.completedLessons.length;
  });

  if (userData.lessonsProgress) {
    Object.entries(userData.lessonsProgress).forEach(([lessonId, progress]) => {
      totalFailedAttempts += progress.failedAttempts;
      if (progress.failedAttempts > maxFailedAttempts) {
        maxFailedAttempts = progress.failedAttempts;
        mostChallengingLessonId = lessonId;
      }
    });
  }

  useEffect(() => {
    if (mostChallengingLessonId === "None") return;

    // Find unit ID
    const unitId = Object.entries(units).find(([, unit]) =>
      unit.lessons.includes(mostChallengingLessonId),
    )?.[0];

    if (unitId) {
      setMostChallengingUnitId(unitId);
    }

    const fetchLessonTitle = async () => {
      const docRef = doc(db, "lessons", mostChallengingLessonId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMostChallengingLessonTitle(docSnap.data().title);
      }
    };

    fetchLessonTitle();
  }, [mostChallengingLessonId, units]);

  const totalCompletionRatio =
    totalLessons > 0 ? completedLessonsCount / totalLessons : 0;
  const totalSubmissions = totalFailedAttempts + completedLessonsCount;

  return (
    <div className="w-full mb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
        <div className="flex flex-col gap-2 items-center w-full">
          <h4 className="text-center opacity-70">Units Completed</h4>
          <p className="text-4xl font-bold">{unitsCompleted}</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <h4 className="text-center opacity-70">Total Completion</h4>
          <p className="text-4xl font-bold">
            {Math.round(totalCompletionRatio * 100)}%
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          <h4 className="text-center opacity-70">Code Submissions</h4>
          <p className="text-4xl font-bold">{totalSubmissions}</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full text-center">
          <h4 className="text-center opacity-70">Most Challenging</h4>
          {mostChallengingLessonId !== "None" ? (
            <Link
              to={`/units/${mostChallengingUnitId}/lessons/${mostChallengingLessonId}/`}
              className="text-2xl font-bold hover:link no-underline"
            >
              {mostChallengingLessonTitle || mostChallengingLessonId}
            </Link>
          ) : (
            <p className="text-2xl font-bold">None</p>
          )}
          {maxFailedAttempts > 0 && (
            <p className="text-sm opacity-70">
              {maxFailedAttempts} failed attempts
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
