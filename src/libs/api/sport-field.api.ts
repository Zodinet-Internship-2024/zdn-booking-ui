'use server';
import axios from 'axios';
import axiosInstance from '../axios';
import { cookies } from 'next/headers';

type GetSportFieldParams = {
  page?: number;
  size?: number;
  query?: string;
  typeId?: string;
  location?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
// export const getSportFields = async ({
//   page = 1,
//   size = 12,
//   query = '',
//   typeId = 'all',
//   location,
// }: GetSportFieldParams) => {
//   ('use server');

//   if (isNaN(page) || isNaN(size)) {
//     page = 1;
//   }
//   const accessToken = cookies().get('access_token')?.value;
//   const sportFieldTypeParam =
//     typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
//   const locationParam = location ? `&location=${location}` : '';
//   const res = await axios.get(
//     `${API_HOST}/sport-field?page=${page - 1}&size=${size}&filter=name:${query}${sportFieldTypeParam}${locationParam}`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     },
//   );

//   return res.data;
// };

export const getSportFieldById = async (id: string) => {
  // const accessToken = cookies().get('access_token')?.value;

  const res = await axiosInstance.get(`${API_HOST}/sport-field/${id}`);

  return res.data;
};

export const getSportFields = async ({
  page = 1,
  size = 12,
  query = '',
  location = '',
  typeId = 'all',
}: GetSportFieldParams) => {
  const accessToken = cookies().get('access_token')?.value;
  const filter = {
    query: query,
    location: location,
    type: typeId,
    page: page - 1,
    limit: size,
  };

  try {
    const res = await axios.get(`${API_HOST}/sport-field`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
