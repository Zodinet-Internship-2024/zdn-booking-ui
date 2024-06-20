'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { cn } from '@/libs/utils';
import React from 'react';

type SportFieldFiltersProps = {
  children: React.ReactNode;
  className?: string;
};

const SportFieldFilters = ({ children, className }: SportFieldFiltersProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <FieldTypeFilter onSelect={() => {}} />
      {children}
    </div>
  );
};

export default SportFieldFilters;
