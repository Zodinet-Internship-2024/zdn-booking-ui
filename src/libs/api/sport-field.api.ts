'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

type GetSportFieldParams = {
  page?: number;
  size?: number;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getSportFields = async ({
  page = 0,
  size = 12,
}: GetSportFieldParams) => {
  'use server';
  const accessToken = cookies().get('access_token')?.value;

  const res = await axios.get(`${API_HOST}/sport-field`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      page,
      size,
    },
  });

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
