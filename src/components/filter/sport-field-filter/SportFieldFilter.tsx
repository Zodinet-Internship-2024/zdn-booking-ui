'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { cn } from '@/libs/utils';
import React from 'react';

type SportFieldFiltersProps = {
  children: React.ReactNode;
  className?: string;
  name: string;
};

const SportFieldFilters = ({
  children,
  className,
  name,
}: SportFieldFiltersProps) => {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-between gap-3',
        className,
      )}
    >
      <FieldTypeFilter name={name} />
      {children}
    </div>
  );
};

export default SportFieldFilters;
