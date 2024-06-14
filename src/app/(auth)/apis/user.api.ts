'use server';

import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:3000';

export const getUserProfile = async () => {
  const accessToken = cookies().get('access_token')?.value;
  const res = await fetch(`${API_HOST}/v1/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
