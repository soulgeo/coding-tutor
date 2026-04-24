import React from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, className = "" }) => {
  const completionRatio = total > 0 ? completed / total : 0;

  return (
    <div className={`bg-base-200 border border-base-content/10 h-4 min-h-4 rounded-full overflow-hidden ${className}`}>
      <div
        className="bg-primary h-full rounded-full transition-[width] duration-500 ease-in-out"
        style={
          {
            width: `${100 * completionRatio}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default ProgressBar;
