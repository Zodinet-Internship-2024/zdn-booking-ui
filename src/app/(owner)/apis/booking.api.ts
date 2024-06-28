//
'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const getOwnerBookings = async () => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  try {
    const response = await fetch(`http://localhost:5000/booking/owner`, {
      method: 'GET',
      headers: {
        Authorization: auth,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    const res = await response.json();

    return res.data;
  } catch (error: any) {
    return {
      error: 'Failed to fetch bookings',
    };
  }
};

export const updateBooking = async (updateData: any, id: string) => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  console.log('data?', updateData);

  try {
    // const response = await fetch(
    //   `http://localhost:5000/booking/update-booking/${id}`,
    //   {
    //     method: 'PATCH',
    //     headers: {
    //       Authorization: auth,
    //     },
    //     body: JSON.stringify(updateData),
    //   },
    // );

    // if (!response.ok) {
    //   throw new Error('Failed to update bookings');
    // }

    const res = await axios.patch(
      `http://localhost:5000/booking/update-booking/${id}`,
      updateData,
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    // const res = await response.json();

    console.log('res', res);

    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
