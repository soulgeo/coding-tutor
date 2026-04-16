import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";
import CourseUnit from "./CourseUnit";

interface Props {
  units: Record<string, Unit> | null;
  unitsProgress: Record<string, UnitProgress>;
}

const UnitsGrid = ({ units, unitsProgress }: Props) => {
  if (!units) return null;

  const unitsData = Object.entries(units).map(([uid, unit]) => ({
    ...unit,
    ...(unitsProgress[uid] ?? { isComplete: false, completedLessons: [] }),
  }));

  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
      {unitsData.map((unitData) => (
        <CourseUnit unitData={unitData} />
      ))}
    </div>
  );
};

export default UnitsGrid;
