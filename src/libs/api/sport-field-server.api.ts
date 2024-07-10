'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

type GetSportFieldParams = {
  page?: number;
  size?: number;
  query?: string;
  typeId?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getSportFields = async ({
  page = 1,
  size = 12,
  query = '',
  typeId = 'all',
}: GetSportFieldParams) => {
  ('use server');

  if (isNaN(page) || isNaN(size)) {
    page = 1;
  }

  const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  const res = await axios.get(
    `${API_HOST}/sport-field?page=${page - 1}&size=${size}&filter=name:${query}${sportFieldTypeParam}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data;
};

export const getSportFieldById = async (id: string) => {
  'use server';
  const accessToken = cookies().get('access_token')?.value;

  const res = await axios.get(`${API_HOST}/sport-field/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
type GetSportFieldBookingEmpty = {
  startTime: string;
  endTime: string;
  sportFieldId?: string;
};

export const getBookingEmptySportField = async ({
  sportFieldId,
  startTime = new Date().toISOString(),
  endTime = new Date().toISOString(),
}: GetSportFieldBookingEmpty) => {
  const accessToken = cookies().get('access_token')?.value;
  try {
    const res = await axios.get(
      `${API_HOST}/booking/bookings-calendar-sport-field/${sportFieldId}?startTime=${startTime}&endTime=${endTime}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

type GetSportFieldParamsByTime = {
  startTime: string;
  endTime: string;
  page?: number;
  size?: number;
  typeId?: string;
};

export const getSportFieldByTime = async ({
  startTime = new Date().toISOString(),
  endTime = new Date().toISOString(),
  page = 0,
  size = 4,
  typeId = 'all',
}: GetSportFieldParamsByTime) => {
  const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  try {
    const res = await axios.get(
      `${API_HOST}/sport-field/by-times?startTime=${startTime}&endTime=${endTime}${sportFieldTypeParam}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { page: page - 1, size },
      },
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};