import React from 'react';

function generateTimeSlots({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) {
  const times = [];
  const start = new Date(startTime);
  const end = new Date(endTime);

  while (start <= end) {
    times.push(start.toTimeString().slice(0, 5));

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

  return (
    <div className="mt-4 flex h-6 flex-col items-center gap-4">
      {timeSlots.map((time, index) => (
        <div key={index}>
          <button className="">{time}</button>
        </div>
      ))}
    </div>
  );
}
