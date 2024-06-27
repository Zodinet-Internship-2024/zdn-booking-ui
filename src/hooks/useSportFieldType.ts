import axiosAuth from '@/libs/axios';
import { useEffect, useState } from 'react';

const useSportFieldType = () => {
  const [types, setTypes] = useState<SportFieldType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSportFieldTypes = async () => {
      try {
        setIsLoading(true);
        const response = await axiosAuth.get('/sport-field-type');
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
