'use client';
import { Button, TimePicker } from 'antd';
import styles from './time-picker.module.scss';
import { cn } from '@/libs/utils';

const CustomTimePicker = () => {
    return (
        <div className={cn(styles.timePickerContainer)}>
            <TimePicker.RangePicker />
            <Button type="primary">Tìm kiếm</Button>
        </div>
    );
};
export default CustomTimePicker;
