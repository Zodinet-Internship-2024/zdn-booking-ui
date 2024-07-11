'use client';

import { fetcher } from '@/libs/utils';
import useSWR from 'swr';
import TableSection from './components/TableSection';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

type OwnerHomePageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
};

const OwnerHomePage = ({ searchParams }: OwnerHomePageProps) => {
  const fieldId = searchParams?.fieldId;

  const {
    data: sportFieldData,
    error: sportFieldError,
    isLoading: sportFieldLoading,
  } = useSWR(`${API_HOST}/field/${fieldId}`, (url: string) => fetcher(url), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (!sportFieldData || sportFieldLoading) {
    return <div>Vui lòng chờ ...</div>;
  }

  const { startTime: startTimeSportField, endTime: endTimeSportField } =
    sportFieldData.data.sportField;

  const nameSportField = sportFieldData.data.name;

  const field: FieldResponse = sportFieldData.data;

  return (
    <div className="container mx-auto">
      <TableSection
        SportFieldTimeProps={{
          startTimeSportField: startTimeSportField,
          endTimeSportField: endTimeSportField,
          nameSportField: nameSportField,
        }}
        field={field}
      />
    </div>
  );
};

export default OwnerHomePage;
