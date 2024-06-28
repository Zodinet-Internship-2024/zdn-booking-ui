import { useState } from 'react';

export function useWeekNavigation(initialDate: Date) {
  const [startWeek, setStartWeek] = useState(initialDate);

  const handleNextWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() + 7)));
  };
  const handlePrevWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() - 7)));
  };

  return { startWeek, handleNextWeek, handlePrevWeek };
}
