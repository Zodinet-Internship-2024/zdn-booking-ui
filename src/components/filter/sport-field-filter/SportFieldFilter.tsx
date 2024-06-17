'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { cn } from '@/libs/utils';
import React from 'react';

type SportFieldFiltersProps = {
  children: React.ReactNode;
};

const SportFieldFilters: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={cn('flex items-center justify-between')}>
      <FieldTypeFilter onSelect={() => {}} />
      {children}
    </div>
  );
};

export default SportFieldFilters;
