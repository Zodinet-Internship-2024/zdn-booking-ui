'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import React, { useState } from 'react';
import SportFieldManagementTable from './SportFieldManagementTable';

const SportFieldManagement = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="mx-36 h-[95%] rounded-t-large bg-white p-10">
      <h4 className="mb-5 font-bold text-natural-700">Quản lý sân</h4>
      <FieldTypeFilter onSelect={setFilter} />
      <div className="mt-8">
        <SportFieldManagementTable filter={filter} />
      </div>
    </div>
  );
};

export default SportFieldManagement;
