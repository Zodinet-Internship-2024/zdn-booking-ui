import React from 'react';

function generateTimeSlots({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const times = [];

  const start = new Date();
  const [startHour, startMinute] = startTime.split(':').map(Number);
  start.setHours(startHour, startMinute, 0, 0);

  const end = new Date();
  const [endHour, endMinute] = endTime.split(':').map(Number);
  end.setHours(endHour, endMinute, 0, 0);

  while (start < end) {
    times.push(start.toTimeString().slice(0, 5)); // Format as 'HH:MM'
    start.setMinutes(start.getMinutes() + 30);
  }

  return times;
}

export default function TimeRow({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const timeSlots = generateTimeSlots({ startTime, endTime });

  console.log(timeSlots.length);
  return (
    <div className="mt-4 flex h-6 flex-col items-center gap-4">
      {timeSlots.map((time, index) => (
        <div key={index}>
          <button className="h-6 w-11">{time}</button>
        </div>
      ))}
    </div>
  );
}
