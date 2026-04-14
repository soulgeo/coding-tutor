import type { UnitProgress } from "../../data/unitProgress";
import CourseUnit from "./CourseUnit";

interface AutoGridProps {
  units: Array<UnitProgress> 
}

const AutoGrid = ({ units }: AutoGridProps) => {
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
      {units.map((unit) => (
        <CourseUnit unit={unit}/>
      ))}
    </div>
  );
};

export default AutoGrid;
