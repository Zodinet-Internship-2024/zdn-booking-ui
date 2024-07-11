'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import SportFieldManagementTable from './SportFieldManagementTable';
import useSportFields from '@/hooks/useSportFields';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SportFieldManagement = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get('type') ?? 'all';
  const { fields, isLoading, error } = useSportFields({
    page: 1,
    size: 10,
    typeId: typeId,
  });
  // useEffect(() => {

  // }, [typeId]);
  return (
    <div className="mx-8 mt-4 h-[95%] w-[90%] rounded-t-large bg-white p-4 lg:mx-12 lg:p-8 xl:mx-24 xl:p-10 2xl:mx-36">
      <h4 className="mb-5 font-bold text-natural-700">Quản lý sân</h4>
      <FieldTypeFilter />
      <div className="mt-8">
        <SportFieldManagementTable sportFields={fields} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SportFieldManagement;
