'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://locahost:5000';
const axiosAuth = axios.create({
  baseURL: `${API_HOST}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuth.interceptors.request.use(
  (config) => {
    const token = cookies().get('access_token')?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.data?.statusCode === 401) {
      return Promise.reject(new Error('Unauthorized'));
    }
    return error;
  },
);

export default axiosAuth;
