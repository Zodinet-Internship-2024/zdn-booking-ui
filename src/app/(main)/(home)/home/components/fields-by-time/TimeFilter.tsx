import CustomTimePicker from '@/components/filter/CustomTimePicker';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import React from 'react';

const TimeFilter = () => {
  return (
    <div>
      <SportFieldFilters>
        <CustomTimePicker />
      </SportFieldFilters>
    </div>
  );
};

export default TimeFilter;
