'use server';
import { setCookie } from '@/libs/set-cookie';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:3000';
export const signUpUser = async (signUpInfo: any): Promise<any> => {
  try {
    console.log(signUpInfo);
    const data = await axios.post(`${API_HOST}/v1/auth/sign-up`, signUpInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const signIn = async (username: string, password: string) => {
  const res = await axios.post(
    `${API_HOST}/v1/auth/login`,
    {
      email: username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  const accessToken: string = res.data?.access_token
    ? res.data.access_token
    : '';

  const refreshToken: string = res.data?.refresh_token
    ? res.data.refresh_token
    : '';

  cookies().set('access_token', accessToken);
  cookies().set('refresh_token', refreshToken);

  return res.data;
};

export const createSocialUser = async (accessToken: string, role: string) => {
  const res = await axios.post(
    `${API_HOST}/v1/user/social-login`,
    {
      role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data;
};

export const removeTokens = () => {
  cookies().delete('access_token');
  cookies().delete('refresh_token');
};

export const handleSignOut = () => {
  removeTokens();
  signOut();
};

export const handleRefreshToken = async (refreshToken: string) => {
  'use server';
  const res = await axios.post(
    `${API_HOST}/v1/auth/refresh-token`,
    { refreshToken },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const accessToken = res.data?.access_token;
  await setCookie('access_token', accessToken);
  return res.data;
};