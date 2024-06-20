'use client';
import React, { useEffect, useState } from 'react';
import { TimePicker, Dropdown, Menu } from 'antd';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';

import styles from './styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';
import Image from 'next/image';

const { RangePicker } = TimePicker;

interface rangePickerProps {
  // onCalendarChange: (dates: any, dateStrings: [string, string]) => void;
  // onOk: (value: any) => void;
  label?: string;
}

function RangePickerComponent({ label }: rangePickerProps) {
  return (
    <div className={`${styles.rangePicker} flex flex-row gap-3 items-center`}>
      <label className={`body-3 text-natural-700`}>{label}</label>
      <RangePicker
        showTime={{
          minuteStep: 30,
        }}
        format="HH:mm"
        locale={locale}
        suffixIcon={
          <ClockCircleOutlined style={{ fontSize: '20px', color: '#939393' }} />
        }
        separator={<Image src={Arrow} alt="arrow" className={``} />}
        className={`flex-grow flex items-center justify-start gap-3`}
        onCalendarChange={(_, [start, end]) => {
          console.log('Start: ', start);
          console.log('End: ', end);
        }}
        onOk={(value) => {
          console.log('Time range selected:', value);
          // Your logic to handle the selection after clicking OK
        }}
      />
    </div>
  );
}

export default RangePickerComponent;
