'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getBookingsByFieldId = async (
  fieldId: string,
  startTime: Date = new Date(),
  endTime: Date = new Date(),
) => {
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(
    `${API_HOST}/booking?fieldId=${fieldId}&startTime=${new Date(startTime).toISOString()}&endTime=${new Date(endTime).toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};
export const getBookingById = async (id: string) => {
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(`${API_HOST}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};
export const removeBookingById = async (id: string) => {
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(`${API_HOST}/booking/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};

export type CreateBookingByOwnerDto = {
  fieldId: string;
  startTime: string;
  endTime: string;
  phone: string;
  name: string;
  amount: number;
  status: BookingStatus;
};

export const createBookingByOwner = async (
  createBookingByOwnerDto: CreateBookingByOwnerDto,
) => {
  const accessToken = cookies().get('access_token')?.value;
  const response = await axios.post(
    `${API_HOST}/booking/owner`,
    createBookingByOwnerDto,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
