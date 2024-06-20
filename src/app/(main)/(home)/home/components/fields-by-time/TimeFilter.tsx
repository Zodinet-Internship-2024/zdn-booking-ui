'use client';
import CustomTimePicker from '@/components/filter/CustomTimePicker';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';

const TimeFilter = () => {
  return (
    <div>
      <SportFieldFilters className="flex-wrap">
        <CustomTimePicker />
      </SportFieldFilters>
    </div>
  );
};

export default TimeFilter;
