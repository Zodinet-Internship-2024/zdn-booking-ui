'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getBookingsByFieldId = async (
  fieldId: string,
  startTime: Date,
  endTime: Date,
  status?: BookingStatus,
) => {
  const accessToken = cookies().get('access_token')?.value;
  const params = new URLSearchParams({
    fieldId,
    startTime: new Date(startTime).toISOString(),
    endTime: new Date(endTime).toISOString(),
  });

  status && params.set('status', status);
  const response = await axios.get(
    `${API_HOST}/booking/user?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
