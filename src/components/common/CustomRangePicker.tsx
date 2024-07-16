'use client';

import React, { useEffect } from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';
import Image from 'next/image';
import moment from 'moment';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';

const { RangePicker } = TimePicker;

interface RangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  onChange?: (value: any) => void;
  label?: string;
  disabled?: boolean;
}

const CustomRangePicker: React.FC<RangePickerProps> = (props) => {
  const { label, onChange, defaultValue, value, disabled } = props;
  const [time, setTime] = React.useState<[dayjs.Dayjs, dayjs.Dayjs]>(
    defaultValue
      ? [dayjs(defaultValue[0], 'HH:mm'), dayjs(defaultValue[1], 'HH:mm')]
      : [dayjs('00:00', 'HH:mm'), dayjs('00:00', 'HH:mm')],
  );

  const handleRangePickerChange = (_: any, [start, end]: [string, string]) => {
    const newTime: [dayjs.Dayjs, dayjs.Dayjs] = [
      dayjs(start, 'HH:mm'),
      dayjs(end, 'HH:mm'),
    ];
    setTime(newTime);

    if (start || end) {
      onChange && onChange(newTime);
    } else {
      onChange && onChange(null);
    }
  };

  return (
    <div className={`${styles.rangePicker} flex flex-row items-center gap-3`}>
      <label className={`body-3 text-natural-700`}>{label}</label>
      <RangePicker
        disabled={disabled}
        defaultValue={
          defaultValue
            ? [dayjs(defaultValue[0], 'HH:mm'), dayjs(defaultValue[1], 'HH:mm')]
            : undefined
        }
        value={time}
        minuteStep={30}
        format="HH:mm"
        locale={locale}
        suffixIcon={
          <ClockCircleOutlined style={{ fontSize: '20px', color: '#939393' }} />
        }
        separator={<Image src={Arrow} alt="arrow" />}
        className={`flex flex-grow items-center justify-start gap-3`}
        onCalendarChange={handleRangePickerChange}
        onOk={(e) => {
          onChange && onChange(e);
        }}
      />
    </div>
  );
};

export default CustomRangePicker;
