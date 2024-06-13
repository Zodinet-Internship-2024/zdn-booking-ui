import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function formatDateToTime(dateTime: Date) {
    return dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}
