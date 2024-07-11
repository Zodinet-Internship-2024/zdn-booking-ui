import { cn, fetcher, parseDateFromString } from '@/libs/utils';
import { Button, Tooltip } from 'antd';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import useSWR from 'swr';
import styles from './ScheduleTable.module.scss';
import ReservationBooking from './ReservationBooking';

interface ScheduleTableProps {
  labelColumns: {
    label: string;
    start: number;
    end: number;
  }[];
  labelRows: string[];
  startDateSchedule: Date;
  endDateSchedule: Date;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  field: FieldResponse;
}

type BookingTime = {
  startTime: string;
  endTime: string;
  amount: number;
};

const ScheduleTable = (props: ScheduleTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [bookingTime, setBookingTime] = useState<BookingTime>();

  const {
    labelColumns,
    labelRows,
    startDateSchedule,
    endDateSchedule,
    handleCheckboxChange,
    field,
  } = props;
  const searchParams = useSearchParams();
  const fieldId = searchParams.get('fieldId') || '';
  const statusQuery = ['accepted', 'disabled'];

  const params = new URLSearchParams({
    fieldId: fieldId || '',
    startTime: startDateSchedule.toISOString(),
    endTime: endDateSchedule.toISOString(),
    status: statusQuery.toString(),
  });

  const {
    data: bookingData,
    error: bookingError,
    isLoading: bookingLoading,
  } = useSWR(
    `/booking/owner-schedule?${params.toString()}`,
    (url: string) => fetcher(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (!bookingData || bookingLoading) {
    return <div>Vui lòng chờ ...</div>;
  }

  const bookingResponse = bookingData.data;

  const bookingMap = bookingResponse.reduce((acc: any, booking: any) => {
    const bookingDate = `${new Date(booking.startTime).toISOString()}`;
    const slot = Math.floor(
      (new Date(booking.endTime).getTime() -
        new Date(booking.startTime).getTime()) /
        (30 * 60 * 1000),
    );

    const newBooking = JSON.parse(JSON.stringify(booking));

    newBooking.slot = slot;
    acc[bookingDate] = newBooking;

    for (let i = 1; i < slot; i++) {
      const bookingSlot = new Date(booking.startTime);
      const newBooking = JSON.parse(JSON.stringify(booking));

      newBooking.slot = 0;
      bookingSlot.setMinutes(bookingSlot.getMinutes() + i * 30);
      acc[bookingSlot.toISOString()] = newBooking;
    }

    return acc;
  }, {});

  function isTimeSlotBooked(
    columnStart: number,
    columnEnd: number,
    date: string,
  ) {
    const inputDate = parseDateFromString(date);
    inputDate.setHours(Math.floor(columnStart / 60), columnStart % 60);

    return bookingMap[inputDate.toISOString()];
  }

  const isPastSlot = (date: string, time: string) => {
    const inputDate = parseDateFromString(date);
    if (!inputDate) {
      return true;
    }

    const currentDate = new Date();
    currentDate.setHours(7, 0, 0, 0);
    const currentTime = new Date();
    const inputTime = new Date();
    inputTime.setHours(Number(time.split(':')[0]), Number(time.split(':')[1]));

    // return inputDate < currentDate && inputTime < currentTime;
    if (startDateSchedule.getFullYear() < inputDate.getFullYear()) {
      return true;
    }
    if (inputDate.getTime() < currentDate.getTime()) {
      return true;
    } else if (inputDate.getTime() === currentDate.getTime()) {
      if (inputTime < currentTime) {
        return true;
      }
    }
    return false;
  };

  return (
    <div>
      <table className="overflow-x-scroll">
        <thead>
          <tr className="min-h-10">
            <th className="absolute min-h-10 min-w-24"></th>
            <th
              className="min-w-24"
              style={{
                border: 'none',
              }}
            ></th>
            {labelColumns.map((labelColumn) => (
              <th
                className="body-3 min-w-48 font-medium"
                key={labelColumn.label}
              >
                {labelColumn.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labelRows.map((labelRow) => (
            <tr key={labelRow} className="min-h-10">
              <td className="body-3 absolute z-[99] w-24 truncate bg-white font-medium">
                {labelRow}
              </td>
              <td
                className="min-w-24 border-none"
                style={{
                  border: 'none',
                }}
              ></td>
              {labelColumns.map((labelColumn) => {
                const booking = isTimeSlotBooked(
                  labelColumn.start,
                  labelColumn.end,
                  labelRow,
                );
                const countSlot = booking?.slot ?? 1;

                if (countSlot === 0) {
                  return null;
                }

                return (
                  <td
                    colSpan={countSlot}
                    key={labelColumn.label + startDateSchedule.toDateString()}
                    className={cn(
                      'h-1 min-h-10',
                      isPastSlot(labelRow, labelColumn.label.split('-')[1]) &&
                        styles.pastSlot,
                    )}
                  >
                    {booking ? (
                      <Tooltip
                        title={
                          booking ? (
                            <>
                              <div className="font-bold">Name:</div>
                              <div>{booking.fullName}</div>
                              <div className="font-bold">Phone:</div>
                              <div>{booking.phone}</div>
                              <div className="font-bold">Start:</div>
                              <div>
                                {new Date(booking.startTime).toLocaleString()}
                              </div>
                              <div className="font-bold">End:</div>
                              <div>
                                {new Date(booking.endTime).toLocaleString()}
                              </div>
                            </>
                          ) : (
                            ''
                          )
                        }
                        color={'green'}
                        key={'green'}
                      >
                        <Button
                          disabled={isPastSlot(
                            labelRow,
                            labelColumn.label.split('-')[1],
                          )}
                          type="text"
                          className="h-full w-full bg-accent-600"
                          onClick={() => {
                            setBookingId(booking.id);
                            setIsOpen(true);
                          }}
                        ></Button>
                      </Tooltip>
                    ) : isPastSlot(
                        labelRow,
                        labelColumn.label.split('-')[1],
                      ) ? (
                      <Tooltip title={'Sân cũ'} color={'green'} key={'green'}>
                        <button></button>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title={'Sân trống'}
                        color={'geekblue-inverse'}
                        key={'green'}
                      >
                        <button
                          className="h-full w-full"
                          onClick={() => {
                            const startDate = parseDateFromString(labelRow);
                            const startBooking = new Date(startDate);
                            startBooking.setHours(
                              Math.floor(labelColumn.start / 60),
                              labelColumn.start % 60,
                            );
                            const endBooking = new Date(startDate);
                            endBooking.setHours(
                              Math.floor(labelColumn.end / 60),
                              labelColumn.end % 60,
                            );

                            setBookingTime({
                              startTime: startBooking.toISOString(),
                              endTime: endBooking.toISOString(),
                              amount: field.sportField?.price ?? 0,
                            });
                            setBookingId('');
                            setIsOpen(true);
                          }}
                        ></button>
                      </Tooltip>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <ReservationBooking
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          isDeleteForm={!!bookingId}
          bookingId={bookingId}
          bookings={bookingResponse}
          field={props.field}
          bookingTime={bookingTime}
        />
      )}
    </div>
  );
};

export default ScheduleTable;
