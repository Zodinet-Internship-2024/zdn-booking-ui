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
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const { lable, style } = props;
  return (
    <Space direction="vertical" size={10} className={``}>
      <div
        className={`${styles.picker} flex flex-row items-center justify-end gap-3`}
      >
        {lable && (
          <p className="body-4 font-medium text-natural-700">{lable}</p>
        )}
        <DatePicker
          defaultValue={dayjs(dayjs(), 'YYYY-MM-DD')}
          format="DD/MM/YYYY"
          locale={locale}
          suffixIcon={
            <Image src={Calendar} alt="calendar" width={20} height={20} />
          }
          className={`body-4`}
        />
      </div>
    </Space>
  );
};

export default DatePickerComponent;
