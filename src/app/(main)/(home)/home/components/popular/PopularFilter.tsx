'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { SportFieldFilters as Filter } from '@/components/common/SportFieldFilters';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { cn } from '@/libs/utils';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const PopularFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-between gap-3',
      )}
    >
      <FieldTypeFilter name="popular" />
      <Button onClick={toggleFilter}>
        <FilterOutlined />
        <span>Lọc</span>
      </Button>
      {isFilterOpen && <Filter />}
    </div>
  );
};

export default PopularFilter;
