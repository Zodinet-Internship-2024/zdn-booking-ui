'use client';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const PopularFilter = () => {
  return (
    <SportFieldFilters>
      <Button>
        <FilterOutlined />
        <span>Lọc</span>
      </Button>
    </SportFieldFilters>
  );
};

export default PopularFilter;
