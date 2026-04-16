import { Link } from "react-router";
import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";

interface Props {
  unitData: Unit & UnitProgress;
}

const CourseUnit = ({ unitData }: Props) => {
  const totalLessons = unitData.lessons;
  const completed = unitData.completedLessons;

  const completionRatio =
    totalLessons.length > 0 ? completed.length / totalLessons.length : 0;

  const nextLessonId =
    totalLessons.find((id) => !completed.includes(id)) || totalLessons[0];

  return (
    <Link to={`/lessons/${nextLessonId}/`} className="block">
      <div className="flex flex-col gap-2 p-4 bg-base-100 rounded shadow min-h-40">
        <h2 className="text-lg font-bold">{unitData.name}</h2>
        <p className="text-sm">{unitData.description}</p>
        <div className="mt-4 border border-base-content h-4 min-h-4">
          <div
            className="bg-base-content h-full"
            style={
              {
                width: `${100 * completionRatio}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </Link>
  );
};

export default CourseUnit;
