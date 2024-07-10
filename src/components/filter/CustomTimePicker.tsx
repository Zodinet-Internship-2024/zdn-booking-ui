'use client';
import { Button, TimePicker } from 'antd';
import styles from './time-picker.module.scss';
import { cn } from '@/libs/utils';
import RangePickerComponent from '../common/RangePickerComponent';
import CustomRangePicker from '../common/CustomRangePicker';
import { useState } from 'react';

type CustomTimePickerProps = {
  onsubmit: (data: any) => void;
};

const CustomTimePicker = ({ onsubmit }: CustomTimePickerProps) => {
  const [value, setValue] = useState<any>({
    start: '',
    end: '',
  });
  const onChange = (value: any) => {
    setValue({
      start: value[0].$d,
      end: value[1].$d,
    });
  };
  const handleSubmit = () => {
    onsubmit(value);
  };
  return (
    <div className={cn(styles.timePickerContainer, 'flex flex-row gap-2')}>
      <CustomRangePicker onChange={onChange} />
      <Button type="primary" onClick={handleSubmit}>
        Tìm kiếm
      </Button>
    </div>
  );
};
export default CustomTimePicker;
