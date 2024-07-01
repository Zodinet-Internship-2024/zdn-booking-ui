'use server';

import { cookies } from 'next/headers';

export const getSportFieldTypes = async () => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  let sportFieldTypes: SportFieldType[] = [];
  try {
    const sportFieldTypeResponse = await fetch(
      'http://localhost:5000/sport-field-type',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!sportFieldTypeResponse.ok) {
      throw new Error('Failed to fetch sport field types');
    }
    const response: BaseResponse = await sportFieldTypeResponse.json();

    sportFieldTypes = response.data;

    return { sportFieldTypes };
  } catch (error: any) {
    return {
      sportFieldTypes,
      error: 'Failed to fetch data',
    };
  } finally {
  }
};

export const getSportField = async (slug: string) => {
  let sportField: SportField;
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  try {
    const sportFieldResponse = await fetch(
      `http://localhost:5000/sport-field/${slug}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!sportFieldResponse.ok) {
      throw new Error('Failed to fetch sport field');
    }
    const response: BaseResponse = await sportFieldResponse.json();


    sportField = response.data;

    return { sportField };
  } catch (error: any) {
    return {
      sportField: null,
      error: 'Failed to fetch data',
    };
  } finally {
  }
};
// export const getLocation = async () => {
//   let provinces: any[] = [];
//   let districts: any[] = [];
//   let wards: any[] = [];
//   try {
//     const auth = localStorage.getItem('token');
//     // Fetch provinces
//     const provincesResponse = await fetch(
//       'http://localhost:5000/location/provinces',
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: auth,
//         },
//       },
//     );
//     if (!provincesResponse.ok) {
//       throw new Error('Failed to fetch provinces');
//     }
//     provinces = await provincesResponse.json();

//     // Fetch districts
//     const districtsResponse = await fetch(
//       'http://localhost:5000/location/districts',
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: auth,
//         },
//       },
//     );
//     if (!districtsResponse.ok) {
//       throw new Error('Failed to fetch districts');
//     }
//     districts = await districtsResponse.json();

//     // Fetch wards
//     const wardsResponse = await fetch('http://localhost:5000/location/ward', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: auth,
//       },
//     });
//     if (!wardsResponse.ok) {
//       throw new Error('Failed to fetch wards');
//     }
//     wards = await wardsResponse.json();

//     return {
//       provinces,
//       districts,
//       wards,
//     };
//   } catch (error: any) {
//     return {
//       provinces,
//       districts,
//       wards,
//       error: 'Failed to fetch data',
//     };
//   } finally {
//   }
// };
