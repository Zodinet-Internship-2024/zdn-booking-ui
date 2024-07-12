//
// ('use server');
'use client';
import axios from 'axios';
// import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
const API_URL = process.env.NEXT_PUBLIC_API_HOST;

export const getOwnerBookings = async (page: number) => {
  // const auth = `Bearer ${cookies().get('access_token')?.value}`;
  const auth = `Bearer ${Cookies.get('access_token')}`;

  try {
    const res = await axios.get(`${API_URL}/booking/owner`, {
      headers: {
        Authorization: auth,
      },
      params: {
        page: page,
      },
    });
    // const response = await fetch(`http://localhost:5000/booking/owner`, {
    //   method: 'GET',
    //   headers: {
    //     Authorization: auth,
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch bookings');
    // }
    // const res = await response.json();
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};

export const updateBooking = async (updateData: any, id: string) => {
  // const auth = `Bearer ${cookies().get('access_token')?.value}`;
  const auth = `Bearer ${Cookies.get('access_token')}`;

  try {
    const res = await axios.patch(
      `${API_URL}/booking/update-booking/${id}`,
      updateData,
      {
        headers: {
          Authorization: auth,
        },
      },
    );
    // const res = await response.json();
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};

export const getAvailableField = async (
  sportFieldId: string,
  start: Date,
  end: Date,
) => {
  // const auth = `Bearer ${cookies().get('access_token')?.value}`;
  const auth = `Bearer ${Cookies.get('access_token')}`;

  try {
    const res = await axios.get(
      `${API_URL}/field/avalable-field?sportFieldId=${sportFieldId}&startTime=${start}&endTime=${end}`,
      {
        headers: {
          Authorization: auth,
        },
      },
    );
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
