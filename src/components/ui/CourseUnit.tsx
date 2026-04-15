import { Link } from "react-router";
import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";

interface Props {
  unitData: Unit & UnitProgress;
}

const CourseUnit = ({ unitData }: Props) => {
  const completionRatio =
    unitData.completedLessons.length / unitData.lessons.length;

  const target = "";

  return (
    <Link to={target} className="block">
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
