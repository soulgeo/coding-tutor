import type { Unit } from "../../data/courseData";
import type { UnitProgress } from "../../data/userData";
import CourseUnit from "./CourseUnit";

interface AutoGridProps {
  units: Record<string, Unit> | null;
  unitsProgress: Record<string, UnitProgress> | undefined;
}

const UnitsGrid = ({ units, unitsProgress }: AutoGridProps) => {
  if (!units || unitsProgress === undefined) return;

  const unitsData: Array<Unit & UnitProgress> = [];
  Object.keys(units).forEach((uid, i) => {
    Object.keys(unitsProgress).forEach((upid) => {
      if (uid == upid) {
        unitsData[i] = { ...units[uid], ...unitsProgress[upid] };
      }
    });
  });

  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
      {unitsData.map((unitData) => (
        <CourseUnit unitData={unitData} />
      ))}
    </div>
  );
};

export default UnitsGrid;
