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
  size = 15,
  typeId = 'all',
  query = '',
}: SportFieldType) => {
  const [sportFields, setSportFields] = useState<SportField[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const location = localStorage.getItem('location');
    const fetchSportField = async () => {
      setIsLoading(true);
      try {
        const response = await getSportFields({
          page,
          size,
          query,
          typeId,
          location: location ? location : '',
        });
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
