import React from 'react';
import ProcessQrBooking from './components/ProcessQrBooking';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const maxDuration = 60;

type BookingQrPageProps = {
  params: {
    id: string;
  };
};
export default async function BookingQrPage({
  params: { id },
}: BookingQrPageProps) {
  const session = await getServerSession();
  console.log('🚀 ~ session:', session);

  if (!session?.user) {
    redirect(`/login?redirect=/booking-qr/${id}`);
  }
  return (
    <div>
      <ProcessQrBooking />
    </div>
  );
}
