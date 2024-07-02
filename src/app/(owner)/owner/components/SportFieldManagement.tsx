'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import SportFieldManagementTable from './SportFieldManagementTable';
import useSportFields from '@/hooks/useSportFields';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SportFieldManagement = () => {
  const searchParams = useSearchParams();
  const typeId = searchParams.get('type') ?? 'all';
  console.log(typeId);
  const { fields, isLoading, error } = useSportFields({
    page: 1,
    size: 10,
    typeId: typeId,
  });
  // useEffect(() => {

  // }, [typeId]);
  return (
    <div className="mx-36 h-[95%] rounded-t-large bg-white p-10">
      <h4 className="mb-5 font-bold text-natural-700">Quản lý sân</h4>
      <FieldTypeFilter />
      <div className="mt-8">
        <SportFieldManagementTable sportFields={fields} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SportFieldManagement;
