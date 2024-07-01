'use server';
import axiosInstance from '@/libs/axios';
import axios from 'axios';
import { cookies } from 'next/headers';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const getFieldById = async (fieldId: string) => {
  const accessToken = cookies().get('access_token')?.value;
  const res = await fetch(`${API_HOST}/field/${fieldId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch field');
  }

  const json = await res.json();
  return json.data;
};
