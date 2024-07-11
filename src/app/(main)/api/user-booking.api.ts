//
// ('use server');
'use client';
import axios from 'axios';
// import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
// const API_URL = 'http://localhost:5000';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const getUserBooking = async (filter: any) => {
  const auth = `Bearer ${Cookies.get('access_token')}`;

  try {
    const res = await axios.get(`${API_HOST}/booking/by-user`, {
      headers: {
        Authorization: auth,
      },
      params: filter,
    });
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
