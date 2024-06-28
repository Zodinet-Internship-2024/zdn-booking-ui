import React from 'react';
import { FieldError } from 'react-hook-form';

interface ErrorsProps {
  error?: FieldError;
}

const Errors: React.FC<ErrorsProps> = ({ error }) => {
  return (
    <span className={`h-3 text-xs font-semibold text-red-400`}>
      {error?.message}
    </span>
  );
};

export default Errors;
