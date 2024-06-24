'use server';
import axiosAuth from '@/libs/axios';
import axios from 'axios';

import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:3000';
export const getUserSportFields = async (
  page: number,
  size: number,
  sportFieldTypeId: string,
): Promise<any> => {
  const accessToken = cookies().get('access_token')?.value as string;
  console.log(accessToken);
  try {
    const sportFieldTypeParam =
      sportFieldTypeId === 'all' ? '' : `&sportFieldTypeId=${sportFieldTypeId}`;
    const data = await axios.get(
      `${API_HOST}/sport-field/me?page=${page - 1}&size=${size}${sportFieldTypeParam}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data.data;
  } catch (error) {
    return error;
  }
};
export const getSportFieldById = async (id: string): Promise<any> => {
  try {
    const data = await axiosAuth.get(`${API_HOST}/sport-field/${id}`);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
