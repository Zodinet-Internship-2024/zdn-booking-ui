'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import React from 'react';
import SportFieldManagementTable from './SportFieldManagementTable';

const SportFieldManagement = () => {
  return (
    <div className="mx-36 mt-12 h-full rounded-t-large bg-white p-10">
      <h4 className="mb-5 font-bold text-natural-700">Quản lý sân</h4>
      <FieldTypeFilter onSelect={() => {}} />
      <div className="mt-8">
        <SportFieldManagementTable />
      </div>
    </div>
  );
};

export default SportFieldManagement;
