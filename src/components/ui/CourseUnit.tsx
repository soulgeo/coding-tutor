import type { UnitProgress } from "../../data/unitProgress";

interface Props {
  unit: UnitProgress;
}

const CourseUnit = ({ unit }: Props) => {

  const completionRatio = unit.exercisesComplete / unit.exercisesTotal;

  return (
    <div className="flex flex-col gap-2 p-4 bg-base-100 rounded shadow min-h-40">
      <h2 className="text-lg font-bold">{unit.name}</h2>
      <p className="text-sm">{unit.description}</p>
      <div className="mt-4 border border-base-content min-h-4">
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
  );
};

export default CourseUnit;
