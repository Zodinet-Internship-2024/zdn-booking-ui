'use client';

import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import styles from './styles/DatePickerComponent.module.scss';
import Calendar from '@public/icons/calendar.svg';
import Image from 'next/image';

interface DatePickerComponentProps {
  lable?: string;
  style?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const { lable, style, onChange, defaultValue, disabled } = props;
  return (
    <Space direction="vertical" size={10} className={``}>
      <div
        className={`${styles.picker} flex flex-row items-center justify-end gap-3`}
      >
        {lable && (
          <p className="body-4 font-medium text-natural-700">{lable}</p>
        )}
        <DatePicker
          disabled={disabled && disabled}
          defaultValue={
            defaultValue
              ? dayjs(defaultValue, 'DD/MM/YYYY')
              : dayjs(dayjs(), 'DD/MM/YYYY')
          }
          format="DD/MM/YYYY"
          locale={locale}
          suffixIcon={
            <Image src={Calendar} alt="calendar" width={20} height={20} />
          }
          onChange={onChange}
          className={`body-4`}
        />
      </div>
    </Space>
  );
};

export default DatePickerComponent;
