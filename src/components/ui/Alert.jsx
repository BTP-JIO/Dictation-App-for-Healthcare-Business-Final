import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const Alert = ({ variant = "destructive", children, className = "" }) => {
  const variantStyles = {
    destructive: "bg-red-50 border border-red-200 text-red-800",
    warning: "bg-yellow-50 border border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border border-blue-200 text-blue-800",
  };

  return (
    <div
      className={`
        flex 
        items-center 
        p-4 
        rounded-lg 
        ${variantStyles[variant]} 
        ${className}
      `}
    >
      <div className="mr-3">
        <ExclamationTriangleIcon className="h-5 w-5" />
      </div>
      {children}
    </div>
  );
};

const AlertDescription = ({ children, className = "" }) => (
  <div className={`text-sm ${className}`}>{children}</div>
);

export { Alert, AlertDescription };
