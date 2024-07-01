import axiosInstance from '@/libs/axios';

import { useEffect, useState } from 'react';

type SportFieldType = {
  page: number;
  size: number;
  typeId: string;
};
const useSportFields = ({ page, size, typeId }: SportFieldType) => {
  console.log(page, size, typeId);
  const [fields, setFields] = useState<SportField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSportField = async () => {
      try {
        setIsLoading(true);
        const sportFieldTypeParam =
          typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
        const response = await axiosInstance.get(
          `/sport-field/me?page=${page - 1}&size=${size}${sportFieldTypeParam}`,
        );
        console.log('🚀 ~ fetchSportFieldTypes ~ response:', response);

        setFields(response.data.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSportField();
  }, []);

  return { fields, isLoading, error };
};
export default useSportFields;
