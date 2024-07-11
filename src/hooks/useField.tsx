'use client';
import { getFieldById } from '@/libs/api/field.api';
import { useEffect, useState } from 'react';

const useField = (fieldId?: string | null) => {
  const [field, setField] = useState<FieldResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchField = async () => {
      if (!fieldId) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await getFieldById(fieldId);
        if (response) {
          setField(response.data);
        }
      } catch (error) {
        setError('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchField();
  }, [fieldId]);

  return { field, isLoading, error };
};

export default useField;
