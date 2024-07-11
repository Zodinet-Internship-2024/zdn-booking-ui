'use client';
import React, { use, useEffect, useState } from 'react';
import RowCalendar from './RowCalendar';
import { getBookingEmptySportField } from '@/libs/api/sport-field-server.api';
import TimeRow from './TimeRow';
import { Spin } from 'antd';
import { cn } from '@/libs/utils';
import s from '../calendar/calendar.module.scss';
interface TimeData {
  startTime: string;
  endTime: string;
  isEmpty: boolean;
}
export default function Calendar({ sportField }: { sportField: SportField }) {
  const [timeSlots, setTimeSlots] = useState<TimeData[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchBookingEmpty = async () => {
    setIsLoading(true);
    const today = new Date();
    console.log(today);
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    console.log(diff);
    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const res = await getBookingEmptySportField({
      sportFieldId: sportField.id,
      startTime: today.toISOString(),
      endTime: sunday.toISOString(),
      startTimeDay: sportField.startTime,
      endTimeDay: sportField.endTime,
    });
    setTimeSlots(res);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBookingEmpty();
  }, []);

  return (
    <div className={cn(s.main)}>
      {isLoading ? (
        <div className="flex h-card w-full items-center justify-center rounded-large bg-accent-100">
          <Spin size="large" />
        </div>
      ) : (
        <div className="relative h-card w-full overflow-x-hidden overflow-y-scroll rounded-large bg-accent-100 md:overflow-x-scroll">
          <div className="w-full">
            <div className="sticky top-0 w-full bg-accent-100">
              <p className="left-6 pl-6 pt-6 text-lg font-bold">
                Lịch tuần này
              </p>
              <div className="top-0 mt-7 flex items-center gap-4 px-6">
                <p className="pointer-events-none h-6 w-11 opacity-0">07:00</p>
                <div className="h-5">
                  <div className="h-5 w-6 text-center">T2</div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">T3 </div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">T4</div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">T5</div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">T6</div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">T7</div>
                </div>
                <div className="h-5">
                  <div className="w-6 text-center">CN</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-6">
            <div className="flex gap-4">
              <TimeRow
                startTime={sportField.startTime}
                endTime={sportField.endTime}
              />

              {timeSlots.map((slots, index) => (
                <RowCalendar key={index} timeSlots={slots} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
