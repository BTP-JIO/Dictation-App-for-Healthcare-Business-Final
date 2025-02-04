import React from "react";

export const Loading = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`animate-spin rounded-full border-2 border-sky-500 border-t-transparent ${sizeClasses[size]}`}
      />
    </div>
  );
};
