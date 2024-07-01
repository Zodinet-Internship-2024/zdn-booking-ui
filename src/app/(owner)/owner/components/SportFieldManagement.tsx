'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import SportFieldManagementTable from './SportFieldManagementTable';

const SportFieldManagement = ({
  sportFields,
}: {
  sportFields: SportField[];
}) => {
  return (
    <div className="mx-36 h-[95%] rounded-t-large bg-white p-10">
      <h4 className="mb-5 font-bold text-natural-700">Quản lý sân</h4>
      <FieldTypeFilter />
      <div className="mt-8">
        <SportFieldManagementTable sportFields={sportFields} />
      </div>
    </div>
  );
};

export default SportFieldManagement;
