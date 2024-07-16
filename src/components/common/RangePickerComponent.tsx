'use client';
import React, { use, useEffect } from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ClockCircleOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/vi_VN';

import styles from './styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';
import Image from 'next/image';
import moment from 'moment';

const { RangePicker } = TimePicker;

interface rangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  // onCalendarChange: (dates: any, dateStrings: [string, string]) => void;
  // onOk: (value: any) => void;
  onChange?: (value: any) => void;
  label?: string;
  disabled?: boolean;
  status?: 'error' | 'warning';
  onFocus?: () => void;
}
const RangePickerComponent: React.FC<rangePickerProps> = (props) => {
  const {
    label,
    onChange,
    defaultValue,
    value,
    disabled,
    status,
    onFocus = () => {},
  } = props;
  const [time, setTime] = React.useState<[dayjs.Dayjs, dayjs.Dayjs]>(
    defaultValue
      ? [dayjs(defaultValue[0], 'HH:mm'), dayjs(defaultValue[1], 'HH:mm')]
      : [dayjs('00:00', 'HH:mm'), dayjs('00:00', 'HH:mm')],
  );

  return (
    <div className={`${styles.rangePicker} flex flex-row items-center gap-3`}>
      <label className={`body-3 text-natural-700`}>{label}</label>
      <RangePicker
        onFocus={onFocus}
        status={status}
        disabled={disabled && disabled}
        defaultValue={
          defaultValue
            ? [dayjs(defaultValue[0], 'HH:mm'), dayjs(defaultValue[1], 'HH:mm')]
            : undefined
        }
        value={defaultValue ? time : undefined}
        minuteStep={30}
        format="HH:mm"
        use12Hours={false}
        locale={locale}
        suffixIcon={
          <ClockCircleOutlined style={{ fontSize: '20px', color: '#939393' }} />
        }
        allowClear={false}
        separator={<Image src={Arrow} alt="arrow" className={``} />}
        className={`flex flex-grow items-center justify-start gap-3`}
        onCalendarChange={(_, [start, end]) => {
          setTime([dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')]);
          if (start && end) {
            // onChange && onChange([dayjs(start, 'HH:mm'), dayjs(end, 'HH:mm')]);
          } else onChange && onChange(null);
        }}
        onOk={(e) => {
          onChange && onChange(e);
        }}
      />
    </div>
  );
};

export default RangePickerComponent;
