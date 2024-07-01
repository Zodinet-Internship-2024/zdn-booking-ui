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
import useFieldSelection from '@/hooks/useFieldSelection';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SportFieldSwiper from '@/components/common/SportFieldSwiper';

dayjs.extend(customParseFormat);
type InfoFieldProps = {
  sportField: SportField;
};

export default function InfoField({ sportField }: InfoFieldProps) {
  const [data, setData] = useState<ModalData>();
  const [isOpen, setIsOpen] = useState(false);
  const [timesChosen, setTimesChosen] = useState<number[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { times, handleDateChange, handleSelect } =
    useFieldSelection(sportField);

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

  const options: SelectProps['options'] = [];
  sportField.fields?.forEach((field) => {
    options.push({
      value: field.id,
      label: field.name,
    });
  });

  const imageUrls = sportField.sportFieldImages?.map((image) => image.url);

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

  const getReservedTime = () => {
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

    console.log(startTime);
    console.log(endTime);

    startTimeResult = dayjs(`${date} ${startTime}`, 'DD/MM/YYYY HH:mm');
    endTimeResult = dayjs(`${date} ${endTime}`, 'DD/MM/YYYY HH:mm');

    return {
      startTimeISO: startTimeResult.toISOString(),
      endTimeISO: endTimeResult.toISOString(),
      startTime: startTimeResult,
      endTime: endTimeResult,
      sportField,
      field: sportField.fields?.find((field) => field.id === fieldId),
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
    const lastValue = timesChosen[timesChosen.length - 1];
    const firstValue = timesChosen[0];
    if (checked) {
      const newValue = Number(value);
      if (value > lastValue) {
        const newTimes = Array.from(
          { length: newValue - lastValue },
          (_, index) => lastValue + index + 1,
        );
        setTimesChosen([...timesChosen, ...newTimes]);
      }

      if (value < firstValue) {
        const newTimes = Array.from(
          { length: firstValue - newValue },
          (_, index) => firstValue - index - 1,
        );
        setTimesChosen([...newTimes, ...timesChosen]);
      }

      if (timesChosen.length === 0) {
        setTimesChosen([Number(value)]);
      }
    } else {
      if (timesChosen.length === 1) {
        setTimesChosen([]);
        return;
      }

      setTimesChosen(timesChosen.filter((time) => time < Number(value)));
    }
    setTimesChosen((prevTimesChosen) => prevTimesChosen.sort((a, b) => a - b));
  };
  const handleClose = () => {
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

  return (
    <div>
      {data && (
        <BookingModal
          data={data}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-2">
            <div>
              <h1 className="mb-5">{sportField.name}</h1>

              <SportFieldShortInfo sportField={sportField} />
              <div className="mt-4">
                <SportFieldRule
                  rulesString={sportField.rule ?? 'Chưa cập nhật'}
                />
              </div>
            </div>
            {imageUrls && imageUrls.length > 0 ? (
              <SportFieldSwiper images={imageUrls} />
            ) : (
              <div className="font-bold text-primary-600">
                Chưa cập nhật ảnh
              </div>
            )}
          </div>
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
                    className="mr-9 w-[108px] text-base font-normal text-natural-700"
                  >
                    {slot.start}-{slot.end}
                  </label>
                  <Checkbox
                    id={slot.start}
                    value={index}
                    disabled={slot.isBooked}
                    checked={timesChosen.includes(index)}
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
