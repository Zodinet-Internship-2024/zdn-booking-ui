'use client';
import React, { useEffect, useState } from 'react';
import type { DatePickerProps, SelectProps } from 'antd';
import { Button, Checkbox, DatePicker, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { cn, formatCurrency, getTime } from '@/libs/utils';
import s from '@/app/(main)/field-reservation/infoField.module.scss';
import SportFieldShortInfo from '@/components/sport-field/SportFieldShortInfo';
import SportFieldRule from '@/components/common/sport-field-rule/SportFieldRule';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useBooking from '@/hooks/useBooking';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import BookingModal, { ModalData } from './BookingModal';

type TimeRange = {
  start: string;
  end: string;
};

type InfoFieldProps = {
  sportField: SportField;
};

export default function InfoField({ sportField }: InfoFieldProps) {
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timesChosen, setTimesChosen] = useState<number[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [times, setTimes] = useState<TimeRange[]>(
    splitTimeRange(sportField.startTime, sportField.endTime),
  );
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

  console.log(dayjs(new Date()));

  const date = searchParams.get('date');
  const fieldId = searchParams.get('field');

  const startTime = getTime(date, sportField.startTime);

  const endTime = getTime(date, sportField.endTime);

  const { bookings, isLoading } = useBooking(
    fieldId,
    startTime,
    endTime,
    'accepted',
  );
  console.log(bookings);
  const bookingTimes = bookings.map((booking) => ({
    start: booking.startTime,
    end: booking.endTime,
  }));

  const timesWithBooking = times.map((time) => {
    const isBooked = bookingTimes.some((bookingTime) => {
      const start = dayjs(bookingTime.start);
      const end = dayjs(bookingTime.end);
      const timeStart = dayjs(time.start, 'HH:mm');
      const timeEnd = dayjs(time.end, 'HH:mm');

      timeStart.set('date', start.get('date'));
      timeEnd.set('date', start.get('date'));

      if (timeStart.isBefore(dayjs()) || timeEnd.isBefore(dayjs())) {
        return true;
      }

      return (
        (timeStart.isAfter(start) || timeStart.isSame(start)) &&
        (timeEnd.isBefore(end) || timeEnd.isSame(end))
      );
    });
    return {
      ...time,
      isBooked,
    };
  });

  const getReservedTime: ModalData = () => {
    let startTimeResult;
    let endTimeResult;

    let startTime;
    let endTime;
    if (timesChosen.length === 1) {
      startTime = timesWithBooking[timesChosen[0]].start;
      endTime = timesWithBooking[timesChosen[0]].end;
    }
    if (timesChosen.length >= 2) {
      startTime = timesWithBooking[timesChosen[0]].start;
      endTime = timesWithBooking[timesChosen[timesChosen.length - 1]].end;
    }

    startTimeResult = dayjs(startTime, 'HH:mm');
    startTimeResult.set('date', dayjs(date, 'DD/MM/YYYY').get('date'));

    endTimeResult = dayjs(endTime, 'HH:mm');
    endTimeResult.set('date', dayjs(date, 'DD/MM/YYYY').get('date'));

    return {
      startTimeISO: startTimeResult.toISOString(),
      endTimeISO: endTimeResult.toISOString(),
      startTime: startTimeResult,
      endTime: endTimeResult,
      sportField,
      fieldId: fieldId as string,
      amount: timesChosen.length * sportField.price,
    };
  };

  const handleSubmit = () => {
    const reversedData = getReservedTime();
    setData(reversedData);
    setIsOpen(true);
  };
  const handleCheck = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    if (checked) {
      setTimesChosen([...timesChosen, Number(value)]);
    } else {
      setTimesChosen(timesChosen.filter((time) => time !== Number(value)));
    }
  };
  const handleClose = () => {
    console.log(123);
    setIsOpen(false);
  };
  const handleReset = () => {
    setTimesChosen([]);
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (!(checkbox as HTMLInputElement).disabled) {
        (checkbox as HTMLInputElement).checked = false;
      }
    });
  };

  console.log(timesChosen);
  return (
    <div>
      {data && (
        <BookingModal data={data} isOpen={isOpen} isClose={handleClose} />
      )}
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="gap-x-18 mt-8 grid grid-cols-1 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {timesWithBooking.map((slot, index) => (
                <div
                  className={cn(
                    'flex flex-wrap items-center',
                    slot.isBooked && 'cursor-not-allowed opacity-50',
                  )}
                  key={slot.start}
                >
                  <label
                    htmlFor={slot.start}
                    className="mr-9 text-base font-normal text-natural-700"
                  >
                    {slot.start}-{slot.end}
                  </label>
                  <Checkbox
                    id={slot.start}
                    value={index}
                    disabled={slot.isBooked}
                    // defaultChecked={slot.isBooked}
                    onChange={handleCheck}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap justify-between">
            <div>
              <p className="text-base font-normal text-natural-700">
                Bạn đang chọn{' '}
                <span className="ml-2 font-bold">
                  {timesChosen.length / 2} tiếng/ngày
                </span>
              </p>
              <p className="mt-3 text-base font-normal">
                Tổng tiền{' '}
                <span className="ml-2 font-bold text-primary-600">
                  {formatCurrency(timesChosen.length * sportField.price)}
                </span>
              </p>
            </div>
            <div className="mt-2">
              <Button type="primary" className="mr-3" onClick={handleReset}>
                Đặt lại
              </Button>
              <Button
                disabled={timesChosen.length === 0}
                onClick={handleSubmit}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
