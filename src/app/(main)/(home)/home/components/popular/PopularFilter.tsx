'use client';
import React from 'react';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { SportFieldFilters as Filter } from '@/components/common/SportFieldFilters';
import { Button } from 'antd';
import { RiFilter2Fill } from 'react-icons/ri';

const PopularFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div>
      <SportFieldFilters>
        <Button onClick={toggleFilter}>
          <RiFilter2Fill />
          <span>Lọc</span>
        </Button>
        {isFilterOpen && <Filter />}
      </SportFieldFilters>
    </div>
  );
};

export default PopularFilter;
