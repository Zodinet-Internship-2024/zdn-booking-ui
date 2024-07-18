//
'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const updateUserProfile = async (userProfile: any) => {
  try {
    console.log('userProfile', userProfile);
    const auth = `Bearer ${Cookies.get('access_token')}`;
    // const response = await fetch(`${API_HOST}/v1/user`, {
    //   method: 'PATCH',
    //   headers: {
    //     Authorization: auth,
    //   },
    //   {
    //     ...userProfile,
    //   }
    // });
    const response = await axios.patch(
      `${API_HOST}/v1/user`,
      {
        name: userProfile.name ? userProfile.name : null,
        phone: userProfile.phone ? userProfile.phone : null,
        imageUrl: userProfile.imageUrl ? userProfile.imageUrl : null,
      },
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    if (!response) {
      throw new Error('Failed to update user profile');
    }
    return response.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
