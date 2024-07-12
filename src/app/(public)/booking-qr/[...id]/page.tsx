import React from 'react';
import ProcessQrBooking from './components/ProcessQrBooking';

export const maxDuration = 60;
export default function page() {
  return (
    <div>
      <ProcessQrBooking />
    </div>
  );
}
