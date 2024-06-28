'use client';
import { Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './ScheduleTable.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  ReloadOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  cn,
  generateColumns,
  getCurrentWeekDates,
  parseDateFromString,
  parseTimeToMinutes,
} from '@/libs/utils';
import ReservationBooking from './ReservationBooking';
import { FieldResponse } from '../page';
import { useWeekNavigation } from '@/hooks/useWeekNavigation';
import ScheduleTable from './ScheduleTable';
import useDocumentLoaded from '@/hooks/useDocumentLoaded';
import { sportField } from '@/mocks/sport-fields';

export interface BookingData {
  id: string;
  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: string;
}

export interface FieldData {
  name: string;
  startTime: string;
  endTime: string;
}

interface ScheduleTableProps {
  fieldData: FieldData;
  bookings: BookingData[];
  field: FieldResponse;
}

export enum CheckStatus {
  CHECKED_BOOKING = 'checked_booking',
  UNCHECKED_BOOKING = 'unchecked_booking',
  DEFAULT = 'default',
}
const ScheduleSection: React.FC<ScheduleTableProps> = ({
  fieldData,
  bookings,
  field,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const columns = generateColumns(fieldData.startTime, fieldData.endTime);
  const { startWeek, handleNextWeek, handlePrevWeek } = useWeekNavigation(
    new Date(),
  );
  const weekDates = getCurrentWeekDates(startWeek);
  const [uncheckedBookings, setUncheckedBookings] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState('');
  const isDocumentLoaded = useDocumentLoaded();

  const [status, setStatus] = useState<CheckStatus>(CheckStatus.DEFAULT);

  useEffect(() => {
    const startDateIndex = 0;
    const endDateIndex = 6;

    const startDate = parseDateFromString(weekDates[startDateIndex]);
    const endDate = parseDateFromString(weekDates[endDateIndex]);
    const params = new URLSearchParams(searchParams);
    startDate && params.set('startDate', new Date(startDate).toISOString());
    endDate && params.set('endDate', new Date(endDate).toISOString());

    router.push(`${pathname}?${params.toString()}`);
  }, [weekDates]);

  // clear all state
  const handleReset = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((el: Element) => {
      if (!el.getAttribute('data-id')) {
        (el as HTMLInputElement).checked = false;
      } else {
        (el as HTMLInputElement).checked = true;
      }
    });
    setStatus(CheckStatus.DEFAULT);
    setUncheckedBookings('');
  };

  const handleSubmit = () => {
    if (status === CheckStatus.CHECKED_BOOKING && getCurrentCancelBookingId()) {
      setIsOpen(true);
      return;
    } else if (status === CheckStatus.UNCHECKED_BOOKING) {
      const { startTime, endTime } = getBookingTime();
      if (startTime && endTime) {
        setIsOpen(true);
        return;
      }
    }

    setIsOpen(false);
  };

  const onCancel = () => {
    router.replace(`/owner/field-map/${field.sportField.id}`);
  };

  const getBookingTime = () => {
    if (!document) {
      return;
    }
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const bookingTime: any = [];

    checkboxes.forEach((el: Element) => {
      if ((el as HTMLInputElement).checked && !el.getAttribute('data-id')) {
        const time = el.getAttribute('data-time') as string;
        const [startTime, endTime] = time.split(' - ');
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');
        bookingTime.push({
          date: parseDateFromString(el.getAttribute('data-date') as string),
          startHour,
          startMinute,
          endTime,
          endHour,
          endMinute,
        });
      }
    });
    let startTime;
    let endTime;

    if (bookingTime.length >= 2) {
      const firstBooking = bookingTime[0];
      const lastBooking = bookingTime[bookingTime.length - 1];

      startTime = new Date(firstBooking.date);
      startTime.setHours(firstBooking.startHour, firstBooking.startMinute);

      endTime = new Date(lastBooking.date);
      endTime.setHours(lastBooking.endHour, lastBooking.endMinute);
    } else if (bookingTime.length === 1) {
      const firstBooking = bookingTime[0];

      startTime = new Date(firstBooking.date);
      startTime.setHours(firstBooking.startHour, firstBooking.startMinute);

      endTime = new Date(firstBooking.date);
      endTime.setHours(firstBooking.endHour, firstBooking.endMinute);
    }
    return {
      startTime,
      endTime,
      amount: bookingTime.length * field.sportField.price,
    };
  };

  const getCurrentCancelBookingId = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < checkboxes.length; i++) {
      const id = checkboxes[i].getAttribute('data-id');
      if (!(checkboxes[i] as HTMLInputElement).checked && id) {
        console.log(id);
        return id;
      }
    }
    return '';
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.getAttribute('data-id');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (status === CheckStatus.UNCHECKED_BOOKING) {
      const nextSibling =
        e.target.parentElement?.nextElementSibling?.getElementsByTagName(
          'input',
        )[0];
      const previousSibling =
        e.target.parentElement?.previousElementSibling?.getElementsByTagName(
          'input',
        )[0];

      if (
        (!nextSibling?.checked || nextSibling.getAttribute('date-id')) &&
        (!previousSibling?.checked || previousSibling.getAttribute('date-id'))
      ) {
        e.target.checked = false;
      } else if (nextSibling?.checked && previousSibling?.checked) {
        e.target.checked = true;
      }

      return;
    }
    if (id) {
      setStatus(CheckStatus.CHECKED_BOOKING);
      setCurrentBookingId(id);
      checkboxes.forEach((el: Element) => {
        if (el.getAttribute('data-id') === id) {
          if (el !== e.target) {
            (el as HTMLInputElement).checked = e.target.checked;
          }
        }
      });
      setUncheckedBookings(!e.target.checked ? id : '');
      // if (uncheckedBookings)
      checkboxes.forEach((el: Element) => {
        if (
          el.getAttribute('data-id') !== id &&
          status !== CheckStatus.DEFAULT
        ) {
          (el as HTMLInputElement).checked = !!el.getAttribute('data-id');
        }
      });
    } else {
      setStatus(CheckStatus.UNCHECKED_BOOKING);
    }
  };

  return (
    <div
      className={cn(
        styles.wrapper,
        'rounded-form flex min-h-[800px] w-11/12 flex-col gap-8 overflow-x-hidden bg-white p-10',
      )}
    >
      {isDocumentLoaded && (
        <ReservationBooking
          isOpen={isOpen}
          isClose={() => setIsOpen(false)}
          isDeleteForm={status === CheckStatus.CHECKED_BOOKING}
          bookingTime={getBookingTime()}
          bookingId={getCurrentCancelBookingId()}
          field={field}
          bookings={bookings}
        />
      )}
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <ArrowLeftOutlined className="mr-4 text-xl" />
        </button>

        <h4 className="cursor-pointer font-bold">
          Quản lý đặt chỗ - {fieldData.name}
        </h4>
      </div>
      <div className={cn(styles.navigation, 'flex gap-10 self-end')}>
        <button className="" onClick={handlePrevWeek}>
          <LeftOutlined />
        </button>
        <button onClick={handleNextWeek}>
          <RightOutlined />
        </button>
        {/* <p>{startWeek.toDateString()}</p> */}
      </div>
      <div className="relative">
        <div className="w-full overflow-auto">
          <ScheduleTable
            columns={columns}
            weekDates={weekDates}
            bookings={bookings}
            status={status}
            handleCheckboxChange={handleCheckboxChange}
            startWeek={startWeek}
          />
        </div>
      </div>
      <div className="flex gap-20 self-end">
        {status !== CheckStatus.DEFAULT && (
          <Button type="default" htmlType="reset" onClick={handleReset}>
            <ReloadOutlined />
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          {...(status === CheckStatus.CHECKED_BOOKING ? { danger: true } : {})}
        >
          {status === CheckStatus.UNCHECKED_BOOKING
            ? 'Đặt sân'
            : status === CheckStatus.CHECKED_BOOKING
              ? 'Hủy'
              : 'Xác nhận'}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleSection;
