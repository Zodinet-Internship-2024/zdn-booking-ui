import React from 'react';
import InfoField from './components/InfoField';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Field Reservation Page',
  description: 'Zodinet Booking - Field Reservation: Reserve Your Field with Ease',
}
export default function page() {
  return (
    <div className="py-12 px-30">
      <InfoField />
    </div>
  );
}
