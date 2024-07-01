import React from 'react';
import InfoField from '../components/InfoField';
import type { Metadata } from 'next';
import { getSportFieldById } from '@/libs/api/sport-field.api';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Field Reservation Page',
  description:
    'Zodinet Booking - Field Reservation: Reserve Your Field with Ease',
};

type FieldReservationPageProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export default async function FieldReservationPage({
  params,
  searchParams,
}: FieldReservationPageProps) {
  const sportFieldId = params.id;

  const sportFieldRes = await getSportFieldById(sportFieldId);

  if (!sportFieldRes?.data) {
    return null;
  }

  const sportField = sportFieldRes.data;

  if (!sportField) {
    return null;
  }

  return (
    <div className="px-30 py-12">
      <InfoField sportField={sportField} />
    </div>
  );
}
