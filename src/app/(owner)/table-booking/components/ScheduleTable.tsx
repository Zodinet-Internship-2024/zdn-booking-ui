import { parseDateFromString, parseTimeToMinutes } from '@/libs/utils';
import { Tooltip } from 'antd';
import { CheckStatus } from './ScheduleSection';
import styles from './ScheduleTable.module.scss';

const ScheduleTable = ({
  columns,
  weekDates,
  bookings,
  status,
  startWeek,
  handleCheckboxChange,
}) => {
  function isTimeSlotBooked(
    columnStart: number,
    columnEnd: number,
    date: string,
  ) {
    const matchedBooking = bookings.find((booking) => {
      const bookingStart = parseTimeToMinutes(
        new Date(booking.startTime).toLocaleTimeString('en-US', {
          hourCycle: 'h24',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
      const bookingEnd = parseTimeToMinutes(
        new Date(booking.endTime).toLocaleTimeString('en-US', {
          hourCycle: 'h24',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
      const inputDate = parseDateFromString(date);
      const bookingDate = new Date(booking.startTime);

      if (
        inputDate &&
        new Date(inputDate).toLocaleDateString() ===
          new Date(bookingDate).toLocaleDateString()
      ) {
        if (columnStart >= bookingStart && columnEnd <= bookingEnd)
          return columnStart >= bookingStart && columnEnd <= bookingEnd;
      }
      return false;
    });

    return matchedBooking;
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
    if (startWeek.getFullYear() < inputDate.getFullYear()) {
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
          {columns.map((column) => (
            <th className="body-3 min-w-48 font-medium" key={column.label}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekDates.map((date) => (
          <tr key={date}>
            <td className="body-3 absolute w-24 truncate bg-white font-medium">
              {date}
            </td>
            <td
              className="min-w-24 border-none"
              style={{
                border: 'none',
              }}
            ></td>
            {columns.map((column) => {
              const booking = isTimeSlotBooked(column.start, column.end, date);
              return (
                <td
                  key={column.label + startWeek.toDateString()}
                  className={
                    isPastSlot(date, column.label.split('-')[1])
                      ? styles.pastSlot
                      : status === CheckStatus.UNCHECKED_BOOKING && booking
                        ? styles.checkedBooking
                        : status === CheckStatus.CHECKED_BOOKING && !booking
                          ? styles.uncheckedBooking
                          : ''
                  }
                >
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
                    <input
                      data-id={booking?.id}
                      data-date={date}
                      data-time={column.label}
                      type="checkbox"
                      defaultChecked={!!booking}
                      onChange={(e) => handleCheckboxChange(e)}
                      disabled={
                        isPastSlot(date, column.label.split('-')[1]) ||
                        (status === CheckStatus.UNCHECKED_BOOKING &&
                          !!booking) ||
                        (status === CheckStatus.CHECKED_BOOKING && !booking)
                      }
                    />
                  </Tooltip>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ScheduleTable;
