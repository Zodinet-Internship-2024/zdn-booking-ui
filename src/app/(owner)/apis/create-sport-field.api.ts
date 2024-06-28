'use server';
import { cookies } from 'next/headers';

export async function getLocation() {
  let provinces: BaseResponse;
  let districts: BaseResponse;
  let wards: BaseResponse;
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  try {
    // Fetch provinces
    const provincesResponse = await fetch(
      'http://localhost:5000/location/provinces',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!provincesResponse.ok) {
      throw new Error('Failed to fetch provinces');
    }
    provinces = await provincesResponse.json();

    // Fetch districts
    const districtsResponse = await fetch(
      'http://localhost:5000/location/districts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      },
    );
    if (!districtsResponse.ok) {
      throw new Error('Failed to fetch districts');
    }
    districts = await districtsResponse.json();

    // Fetch wards
    const wardsResponse = await fetch('http://localhost:5000/location/ward', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    if (!wardsResponse.ok) {
      throw new Error('Failed to fetch wards');
    }
    wards = await wardsResponse.json();

    return {
      provinces: provinces.data,
      districts: districts.data,
      wards: wards.data,
    };
  } catch (error: any) {
    return {
      provinces: [],
      districts: [],
      wards: [],
      error: 'Failed to fetch data',
    };
  } finally {
  }
}

export const postData = async (data: any, method: string) => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  switch (method) {
    case 'create':
      try {
        const response = await fetch('http://localhost:5000/sport-field', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth,
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (error) {
        return {
          statusCode: 500,
          message: 'Failed to create sport field',
        };
      }
      break;
    case 'edit':
      try {
        console.log(data);
        const response = await fetch(
          `http://localhost:5000/sport-field/${data.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: auth,
            },
            body: JSON.stringify(data),
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
      } catch (error) {
        return {
          statusCode: 500,
          message: 'Failed to update sport field',
        };
      }
      break;
    default:
      break;
  }
};
