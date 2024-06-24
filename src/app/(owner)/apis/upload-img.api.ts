//
'use server';
import { cookies } from 'next/headers';

export const uploadImage = async (file: FormData) => {
  // formData.append('file', file);
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  console.log('formData', file);

  const response = await fetch(
    `http://localhost:5000/firebase/upload-sport-field-image`,
    {
      method: 'POST',
      headers: {
        Authorization: auth,
      },
      body: file,
    },
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  const res = await response.json();

  return res.data[0];
};
