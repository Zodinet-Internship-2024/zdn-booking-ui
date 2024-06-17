'use client';
import React, { useEffect, useState } from 'react';
import type { DatePickerProps, SelectProps } from 'antd';
import { Button, Checkbox, DatePicker, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { cn } from '@/libs/utils';
import s from '@/app/(main)/field-reservation/infoField.module.scss';

type TimeRange = {
  start: string;
  end: string;
};

export default function InfoField() {
  const [times, setTimes] = useState<TimeRange[]>([
    {
      start: '',
      end: '',
    },
  ]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const options: SelectProps['options'] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  function splitTimeRange(startTime: string, endTime: string) {
    const timeSlots = [];
    let [startHour, startMinute] = startTime.split(':').map(Number);
    let [endHour, endMinute] = endTime.split(':').map(Number);

    const formatTime = (hour: number, minute: number) => {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      return `${h}:${m}`;
    };

    while (
      startHour < endHour ||
      (startHour === endHour && startMinute < endMinute)
    ) {
      const currentTime = formatTime(startHour, startMinute);

      startMinute += 30;
      if (startMinute >= 60) {
        startMinute -= 60;
        startHour += 1;
      }

      const nextTime = formatTime(startHour, startMinute);
      if (
        startHour < endHour ||
        (startHour === endHour && startMinute <= endMinute)
      ) {
        timeSlots.push({
          start: currentTime,
          end: nextTime,
        });
      }
    }

    return timeSlots;
  }

  useEffect(() => {
    const time = splitTimeRange('9:00', '18:00');
    setTimes(time);
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <p className="mr-3 cursor-pointer text-sm font-medium text-natural-400">
          Trang chủ
        </p>
        <RightOutlined className="mr-3 h-4 w-4 text-natural-400" />
        <p className="cursor-pointer text-sm font-medium text-primary-600">
          Đặt chỗ ngay
        </p>
      </div>

      <div className={cn(s.main)}>
        <div className="flex flex-wrap">
          <div className="mr-4 flex flex-col">
            <span className="mb-3 text-base font-bold text-natural-700">
              Ngày
            </span>
            <DatePicker
              name="date-res"
              format={{
                format: 'DD/MM/YYYY',
                type: 'mask',
              }}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col">
            <span className="mb-3 text-base font-bold text-natural-700">
              Sân
            </span>
            <Select options={options} />
          </div>
        </div>
        <div className="gap-x-18 mt-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {/* {Array.from({ length: 24 }).map(() => (
            <div className="flex items-center flex-wrap ">
              <span className="font-normal text-base text-natural-700 mr-9">
                5:00 - 5:30
              </span>
              <Checkbox value="A"></Checkbox>
            </div>
          ))} */}
          {times.map((slot, index) => (
            <div className="flex flex-wrap items-center" key={index}>
              <span className="mr-9 text-base font-normal text-natural-700">
                {slot.start}-{slot.end}
              </span>
              <Checkbox value={`Slot-${index}`} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-between">
          <div>
            <p className="text-base font-normal text-natural-700">
              Bạn đang chọn <span className="ml-2 font-bold">5 tiếng/ngày</span>
            </p>
            <p className="mt-3 text-base font-normal">
              Tổng tiền{' '}
              <span className="ml-2 font-bold text-primary-600">
                1.400.000đ
              </span>
            </p>
          </div>
          <div className="mt-2">
            <Button type="primary" className="mr-3">
              Đặt lại
            </Button>
            <Button>Xác nhận</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
