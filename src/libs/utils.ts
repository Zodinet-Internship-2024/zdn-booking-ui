import { VALID_ROLES } from '@/constants/constant';
import { ClassValue, clsx } from 'clsx';
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