// import dotenv from 'dotenv';

// dotenv.config();
import Cookies from 'js-cookie';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const auth = `Bearer ${Cookies.get('access_token')}`;

  const response = await fetch(`${API_HOST}/firebase/upload-avatar`, {
    method: 'POST',
    headers: {
      Authorization: auth,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  const res = await response.json();

  return res.data;
};
