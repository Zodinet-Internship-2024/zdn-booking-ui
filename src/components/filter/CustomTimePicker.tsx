'use client';
import { Button, TimePicker } from 'antd';
import styles from './time-picker.module.scss';
import { cn } from '@/libs/utils';
import RangePickerComponent from '../common/RangePickerComponent';
import CustomRangePicker from '../common/CustomRangePicker';
import { useState } from 'react';
import dayjs from 'dayjs';

type CustomTimePickerProps = {
  onsubmit: (data: any) => void;
};

const CustomTimePicker = ({ onsubmit }: CustomTimePickerProps) => {
  const [value, setValue] = useState<any>({
    start: dayjs().format('HH:mm'),
    end: dayjs()
      .set('hour', dayjs().get('hour') + 1)
      .format('HH:mm'),
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
      <CustomRangePicker
        defaultValue={[value.start, value.end]}
        onChange={onChange}
      />
      <Button type="primary" onClick={handleSubmit}>
        Tìm kiếm
      </Button>
    </div>
  );
};
export default CustomTimePicker;
