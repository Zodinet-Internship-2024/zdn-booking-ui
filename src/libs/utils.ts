import { VALID_ROLES } from '@/constants/constant';
import { ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatDateToTime(dateTime: Date) {
  return dateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function getValidRole(role: string = 'user') {
  return VALID_ROLES.includes(role) ? role : 'user';
}

export function getValidFilterType(tabs: any[], type: string) {
  return tabs.find((tab) => tab.value === type) ? type : 'all';
}

export function formatCurrency(value: number = 0) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'code',
  });
}

export function parseTimeToMinutes(timeStr: string) {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 60 + minutes + (seconds || 0) / 60;
}

export function generateColumns(startTime: string, endTime: string) {
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  const totalMinutes = endMinutes - startMinutes;

  return Array.from({ length: Math.floor(totalMinutes / 30) }, (_, i) => {
    const minutes = startMinutes + 30 * i;
    const endMinutes = minutes + 30;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return {
      label: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} - ${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`,
      start: minutes,
      end: endMinutes,
    };
  });
}

export function getCurrentWeekDates(now: Date) {
  const monday = new Date(
    now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)),
  );
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(new Date(monday).setDate(monday.getDate() + i));
    const weekdayShort = day
      .toLocaleDateString('vi', { weekday: 'short' })
      .replace('.', '');
    const formattedWeekday = weekdayShort.replace('Th ', 'T'); // Remove space after 'Th'
    return `${formattedWeekday} - ${day.getDate()}/${day.getMonth() + 1}`;
  });
}

export function parseDateFromString(dateStr: string) {
  if (!dateStr) {
    return null;
  }
  // Split the input string into components
  const parts = dateStr.split(' - '); // E.g., ['T2', '30/6']
  if (parts.length !== 2) {
    throw new Error('Invalid date format');
  }

  // Extract the day and month
  const [day, month] = parts[1].split('/').map(Number); // Convert day and month to numbers

  // Get the current year to use it in the date object
  const year = new Date().getFullYear();

  // Create a new Date object in UTC
  const date = new Date(Date.UTC(year, month - 1, day));

  // Ensure the created date matches the input day and month (handles edge cases around month changes)
  if (date.getUTCDate() !== day || date.getUTCMonth() + 1 !== month) {
    throw new Error('Invalid day or month in date string');
  }

  return date;
}
export const getTime = (date: string | null, startTime: string) => {
  if (!date) {
    return new Date();
  }

  const [day, month, year] = date.split('/').map(Number);
  const currentDate = new Date(`${year}-${month}-${day}`);
  const [hour, minute] = startTime.split(':').map(Number);
  currentDate.setHours(hour, minute);

  console.log(date, startTime, currentDate);
  return currentDate;
};
