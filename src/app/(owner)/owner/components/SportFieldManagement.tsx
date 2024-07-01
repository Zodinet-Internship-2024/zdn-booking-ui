'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import SportFieldManagementTable from './SportFieldManagementTable';
import useSportFields from '@/hooks/useSportFields';

const SportFieldManagement = () => {
  const { fields, isLoading, error } = useSportFields({
    page: 1,
    size: 10,
    typeId: 'all',
  });

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
