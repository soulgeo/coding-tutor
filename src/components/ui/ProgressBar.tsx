import React from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, className = "" }) => {
  const completionRatio = total > 0 ? completed / total : 0;

  return (
    <div className={`border border-accent h-4 min-h-4 rounded-lg overflow-hidden ${className}`}>
      <div
        className="bg-base-content h-full rounded-lg"
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
