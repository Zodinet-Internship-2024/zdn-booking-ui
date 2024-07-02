'use client';
import { Button, TimePicker } from 'antd';
import styles from './time-picker.module.scss';
import { cn } from '@/libs/utils';
import RangePickerComponent from '../common/RangePickerComponent';
import CustomRangePicker from '../common/CustomRangePicker';

const CustomTimePicker = () => {
  return (
    <div className={cn(styles.timePickerContainer, 'flex flex-row gap-2')}>
      <CustomRangePicker />
      <Button type="primary">Tìm kiếm</Button>
    </div>
  );
};
export default CustomTimePicker;
