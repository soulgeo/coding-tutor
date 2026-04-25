import { Link } from "react-router";
import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";
import ProgressBar from "./ProgressBar";

interface Props {
  unitData: Unit & UnitProgress & { uid: string };
  index: number;
}

const UnitBox = ({ unitData, index }: Props) => {
  const totalLessons = unitData.lessons;
  const completedLessons = unitData.completedLessons;
  const completed = totalLessons.length == completedLessons.length;

  const nextLessonId =
    totalLessons.find((id) => !completedLessons.includes(id)) || totalLessons[0];

  return (
    <Link
      to={`/units/${unitData.uid}/lessons/${nextLessonId}/`}
      className="block"
    >
      <div className="flex flex-col gap-2 p-4 bg-base-100 rounded shadow min-h-35">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold">
            {index}. {unitData.name}
          </h3>
          <p className={completed ? "text-success" : ""}>
            {completedLessons.length} / {totalLessons.length}
          </p>
        </div>
        <p className="text-sm">{unitData.description}</p>
        <ProgressBar
          completed={completedLessons.length}
          total={totalLessons.length}
          className="mt-4"
        />
      </div>
    </Link>
  );
};

export default UnitBox;
