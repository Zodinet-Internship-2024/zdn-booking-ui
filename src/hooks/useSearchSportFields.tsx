import { getSportFields } from '@/libs/api/sport-field.api';
import axiosInstance from '@/libs/axios';

import { useEffect, useState } from 'react';

type SportFieldType = {
  page?: number;
  size?: number;
  typeId?: string;
  query?: string;
};
const useSearchSportFields = ({
  page = 1,
  size = 12,
  typeId = 'all',
  query = '',
}: SportFieldType) => {
  const [sportFields, setSportFields] = useState<SportField[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSportField = async () => {
      try {
        setIsLoading(true);

        const response = await getSportFields({ page, size, query, typeId });
        console.log('🚀 ~ fetchSportFieldTypes ~ response:', response);
        setTotalPage(response.totalPage);
        setSportFields(response.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSportField();
  }, [page, size, typeId, query]);

  return { sportFields, isLoading, error, totalPage };
};
export default useSearchSportFields;
