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
    uid,
    ...(unitsProgress[uid] ?? { completedLessons: [] }),
  }));

  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] w-full">
      {unitsData.map((unitData, i) => (
        <CourseUnit key={unitData.uid} unitData={unitData} index={i + 1} />
      ))}
    </div>
  );
};

export default UnitsGrid;
