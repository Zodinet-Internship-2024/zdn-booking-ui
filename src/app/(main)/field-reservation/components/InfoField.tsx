'use client';
import React, { useEffect, useState } from 'react';
import type { DatePickerProps, SelectProps } from 'antd';
import { Button, Checkbox, DatePicker, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { cn } from '@/libs/utils';
import s from '@/app/(main)/field-reservation/infoField.module.scss';
import SportFieldShortInfo from '@/components/sport-field/SportFieldShortInfo';
import SportFieldRule from '@/components/common/sport-field-rule/SportFieldRule';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TimeRange = {
  start: string;
  end: string;
};

type InfoFieldProps = {
  sportField: SportField;
};

export default function InfoField({ sportField }: InfoFieldProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [times, setTimes] = useState<TimeRange[]>([
    {
      start: '',
      end: '',
    },
  ]);
  useEffect(() => {
    const date = searchParams.get('date');
    const field = searchParams.get('field');
    if (!sportField.fields?.length) {
      return;
    }
    if (!date || !field) {
      router.replace(
        `${pathname}?date=${dayjs(new Date()).format('DD/MM/YYYY')}&field=${sportField.fields?.[0].id}`,
        { scroll: false },
      );
    }
  }, []);

  const handleDateChange: DatePickerProps['onChange'] = (
    date,
    dateString: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('date', dateString);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const options: SelectProps['options'] = [];
  sportField.fields?.forEach((field) => {
    options.push({
      value: field.id,
      label: field.name,
    });
  });

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('field', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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

  console.log(dayjs(new Date()));

  return (
    <div>
      <div className="mb-6 flex items-center">
        <p className="mr-3 cursor-pointer text-sm font-medium text-natural-400">
          Trang chủ
        </p>
        <RightOutlined className="mr-3 h-4 w-4 text-natural-400" />
        <p className="cursor-pointer text-sm font-medium text-primary-600">
          Đặt chỗ ngay
        </p>
      </div>

      <div className={cn(s.main)}>
        <h1 className="mb-5">{sportField.name}</h1>
        <div className="space-y-8">
          <SportFieldShortInfo sportField={sportField} />
          <SportFieldRule rulesString={sportField.rule ?? 'Chưa cập nhật'} />
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
                defaultValue={
                  searchParams.get('date')
                    ? dayjs(searchParams.get('date'), 'DD/MM/YYYY')
                    : dayjs(new Date())
                }
                minDate={dayjs(new Date())}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex flex-col">
              <span className="mb-3 text-base font-bold text-natural-700">
                Sân
              </span>
              {options.length > 0 && (
                <Select
                  options={options}
                  onSelect={handleSelect}
                  defaultValue={options[0].value as string}
                />
              )}
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
                Bạn đang chọn{' '}
                <span className="ml-2 font-bold">5 tiếng/ngày</span>
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
    </div>
  );
}
