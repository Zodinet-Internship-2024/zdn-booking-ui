//
'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
// import Cookies from 'js-cookie';


export const getOwnerBookings = async () => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  try {
    const res = await axios.get(`http://localhost:5000/booking/owner`, {
      headers: {
        Authorization: auth,
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
    // console.log('res', res.data);
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
  const auth = `Bearer ${cookies().get('access_token')?.value}`;


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
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
