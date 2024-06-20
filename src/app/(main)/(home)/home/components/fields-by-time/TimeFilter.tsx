'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import CustomTimePicker from '@/components/filter/CustomTimePicker';
import { cn } from '@/libs/utils';

const TimeFilter = () => {
  return (
    <div className={cn('flex items-center justify-between')}>
      <FieldTypeFilter onSelect={() => {}} name="timeType" />
      <CustomTimePicker />
    </div>
  );
};

export default TimeFilter;
