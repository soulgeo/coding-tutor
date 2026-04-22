import { Link } from "react-router";
import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";

interface Props {
  unitData: Unit & UnitProgress & { uid: string };
  index: number;
}

const UnitBox = ({ unitData, index }: Props) => {
  const totalLessons = unitData.lessons;
  const completed = unitData.completedLessons;

  const completionRatio =
    totalLessons.length > 0 ? completed.length / totalLessons.length : 0;

  const nextLessonId =
    totalLessons.find((id) => !completed.includes(id)) || totalLessons[0];

  return (
    <Link
      to={`/units/${unitData.uid}/lessons/${nextLessonId}/`}
      className="block"
    >
      <div className="flex flex-col gap-2 p-4 bg-base-100 rounded shadow min-h-40">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold">
            {index}. {unitData.name}
          </h3>
          <p>
            {completed.length} / {totalLessons.length}
          </p>
        </div>
        <p className="text-sm">{unitData.description}</p>
        <div className="mt-4 border border-accent h-4 min-h-4 rounded-lg">
          <div
            className="bg-base-content h-full rounded-lg"
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

export default UnitBox;
