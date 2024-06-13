import React from "react";
import { FieldError } from "react-hook-form";

interface ErrorsProps {
  error?: FieldError;
}

const Errors: React.FC<ErrorsProps> = ({ error }) => {
  return (
    <span className={`text-red-400 h-3 font-semibold text-xs `}>
      {error?.message}
    </span>
  );
};

export default Errors;
