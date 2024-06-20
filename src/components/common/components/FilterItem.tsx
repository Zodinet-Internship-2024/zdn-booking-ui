'use client';
import React, { useEffect, useState } from 'react';
import { TimePicker, Dropdown, Menu } from 'antd';
import dayjs from 'dayjs';
import {
  ArrowRightOutlined,
  CaretDownFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import RadioBtn from './RadioButton';
import DatePickerComponent from '../DatePickerComponent';
import locale from 'antd/es/date-picker/locale/vi_VN';

import styles from '../styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';
import Image from 'next/image';
import RangePickerComponent from '../RangePickerComponent';

interface OptionItem {
  label: string;
  value: string;
}
interface FilterItemProps {
  filter: {
    title: string;
    name: string;
    options: OptionItem[];
  };
  onFilterChange: (filter: any) => void;
  isNeedReset: boolean;
  setIsNeedReset: () => void;
}

const { RangePicker } = TimePicker;

export const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  onFilterChange,
  isNeedReset,
  setIsNeedReset,
}) => {
  const [activeTab, setActiveTab] = useState(filter.options[0]?.value || '');
  const [open, setOpen] = useState(true);
  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    setActiveTab(value);
  };

  useEffect(() => {
    if (isNeedReset) {
      console.log('Resetting filter');
      setIsNeedReset();

      setActiveTab(filter.options[0]?.value || '');
    }
  }, [isNeedReset]);

  return (
    <div className={`flex flex-col gap-5 w-full`}>
      <div className={`flex flex-row justify-between`}>
        <span className={`body-3 font-bold text-natural-700 w-full`}>
          {filter.title}
        </span>
        <CaretDownFilled onClick={() => setOpen(!open)} />
      </div>
      {open &&
        (filter.name === 'time' ? (
          <div className={`flex flex-col gap-3 w-full`}>
            <DatePickerComponent></DatePickerComponent>
            <RangePickerComponent label="Thời gian"></RangePickerComponent>
            {/* <div
              className={`${styles.rangePicker} flex flex-row gap-3 items-center`}
            >
              <label className={`body-3 text-natural-700`}>Thời gian</label>
              <RangePicker
                showTime={{
                  minuteStep: 30,
                }}
                format="HH:mm"
                locale={locale}
                suffixIcon={
                  <ClockCircleOutlined
                    style={{ fontSize: '20px', color: '#939393' }}
                  />
                }
                separator={<Image src={Arrow} alt="arrow" className={``} />}
                className={`flex-grow flex items-center justify-start gap-4`}
                onCalendarChange={(_, [start, end]) => {
                  console.log('Start: ', start);
                  console.log('End: ', end);
                }}
                onOk={(value) => {
                  console.log('Time range selected:', value);
                  // Your logic to handle the selection after clicking OK
                }}
              />
            </div> */}
          </div>
        ) : (
          <div className={`flex flex-col gap-3 w-full`}>
            {filter.options.map((option, index) => (
              <RadioBtn
                key={option.value}
                label={option.label}
                value={option.value}
                isActive={activeTab}
                onClick={handleFilterChange}
              ></RadioBtn>
            ))}
          </div>
        ))}
      {filter.name !== 'time' && (
        <span className="w-full border-b border-natural-200 pt-3"></span>
      )}
    </div>
  );
};
