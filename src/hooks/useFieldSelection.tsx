import { DatePickerProps, SelectProps } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type TimeRange = {
  start: string;
  end: string;
};

const useFieldSelection = (sportField: SportField) => {
  const [times, setTimes] = useState<TimeRange[]>(
    splitTimeRange(sportField.startTime, sportField.endTime),
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('field', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateChange: DatePickerProps['onChange'] = (
    date,
    dateString: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('date', dateString);
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
  return { times, handleSelect, handleDateChange };
};
export default useFieldSelection;
