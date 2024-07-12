'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export async function getLocation() {
  let provinces: BaseResponse;
  let districts: BaseResponse;
  let wards: BaseResponse;
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  try {
    // Fetch provinces
    const provincesResponse = await fetch(`${API_HOST}/location/provinces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    if (!provincesResponse.ok) {
      throw new Error('Failed to fetch provinces');
    }
    provinces = await provincesResponse.json();

    // Fetch districts
    const districtsResponse = await fetch(`${API_HOST}/location/districts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    if (!districtsResponse.ok) {
      throw new Error('Failed to fetch districts');
    }
    districts = await districtsResponse.json();

    // Fetch wards
    const wardsResponse = await fetch(`${API_HOST}/location/ward`, {
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
export const searchSportFieldAddress = async (address: string) => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;
  try {
    const response = await axios
      .get(`${API_HOST}/location/address`, {
        headers: {
          Authorization: auth,
        },
        params: {
          address,
        },
      })
      .then((res) => res.data);
    console.log(response);
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      message: 'Failed to search address',
    };
  }
};

export const postData = async (data: any, method: string) => {
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  switch (method) {
    case 'create':
      try {
        const response = await fetch(`${API_HOST}/sport-field`, {
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
        const response = await fetch(`${API_HOST}/sport-field/${data.id}`, {
          method: 'PATCH',
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
          message: 'Failed to update sport field',
        };
      }
      break;
    default:
      break;
  }
};
