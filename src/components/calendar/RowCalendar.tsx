import React from 'react';

type TimeData = {
  startTime: string;
  endTime: string;
  isEmpty: boolean;
};
interface RowCalendarProps {
  timeSlots: TimeData[];
}
export default function RowCalendar({ timeSlots }: RowCalendarProps) {
  return (
    <div className="mt-4 flex h-6 flex-col items-center gap-4">
      {timeSlots.map((time, index) => (
        <div key={index} className="h-6">
          <button
            className={`h-6 w-6 rounded-lg p-0 ${time.isEmpty ? 'bg-accent-500' : 'bg-neutral-200'} `}
          ></button>
        </div>
      ))}
    </div>
  );
}

