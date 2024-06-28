import axiosAuth from '@/libs/axios';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const useSportFieldType = () => {
  const [types, setTypes] = useState<SportFieldType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSportFieldTypes = async () => {
      const accessToken = getCookie('access_token');
      try {
        setIsLoading(true);
        const response = await axios.get('/sport-field-type', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('🚀 ~ fetchSportFieldTypes ~ response:', response);

        setTypes(response.data.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSportFieldTypes();
  }, []);

  return { types, isLoading, error };
};
export default useSportFieldType;
