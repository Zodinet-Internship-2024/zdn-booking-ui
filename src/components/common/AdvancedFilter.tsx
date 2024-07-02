'use client';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { SportFieldFilters } from '@/components/common/SportFieldFilters';
import { useState } from 'react';

const AdvancedFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  return (
    <>
      <Button onClick={toggleFilter}>
        <FilterOutlined />
        <span>Lọc</span>
      </Button>
      {isFilterOpen && <SportFieldFilters />}
    </>
  );
};
export default AdvancedFilter;
