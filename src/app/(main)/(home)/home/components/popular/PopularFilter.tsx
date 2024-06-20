'use client';
import { SportFieldFilters as Filter } from '@/components/common/SportFieldFilters';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const PopularFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div>
      <SportFieldFilters>
        <Button onClick={toggleFilter}>
          <FilterOutlined />
          <span>Lọc</span>
        </Button>
        {isFilterOpen && <Filter />}
      </SportFieldFilters>
    </div>
  );
};

export default PopularFilter;
