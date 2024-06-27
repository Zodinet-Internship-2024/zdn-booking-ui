'use client';
import React, { useState } from 'react';
import AccentButton from './components/AccentButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getValidFilterType } from '@/libs/utils';
import useSportFieldType from '@/hooks/useSportFieldType';
import { Skeleton } from 'antd';

export const tabs: { [key: string]: string } = {
  all: 'Tất cả',
  basketball: 'Bóng rổ',
  volleyball: 'Bóng chuyền',
  badminton: 'Cầu lông',
  tennis: 'Tennis',
  football: 'Bóng đá',
  tableTennis: 'Bóng bàn',
  billiards: 'Bi-da',
};

interface FieldTypeFilterProps {
  name?: string;
}

const FieldTypeFilter: React.FC<FieldTypeFilterProps> = ({ name = 'type' }) => {
  const { types, isLoading } = useSportFieldType();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get(name);
  const handleChangeTab = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    const url = `${pathname}?${params.toString()}`;

    router.replace(url, { scroll: false });
  };

  if (!types.find((type) => type.id === currentTab)) {
    handleChangeTab('all');
  }

  const handleClick = (value: string) => {
    handleChangeTab(value);
  };

  if (isLoading) {
    const NUMBER_OF_SKELETON = 6;
    return <FieldTypeFilterSkeleton size={NUMBER_OF_SKELETON} />;
  }
  const allBtn = {
    value: 'all',
    label: 'Tất cả',
  };
  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 xl:flex`}>
      <AccentButton
        key={allBtn.value}
        label={allBtn.label}
        value={allBtn.value}
        isActive={currentTab === allBtn.value}
        onClick={handleClick}
      />
      {types?.map((type) => (
        <AccentButton
          key={type.id}
          label={tabs[type.name] ?? type.name}
          value={type.id}
          isActive={currentTab === type.id}
          onClick={() => handleClick(type.id)}
        />
      ))}
    </div>
  );
};

export const FieldTypeFilterSkeleton = ({ size }: { size: number }) => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: size }).map(() => (
        <Skeleton.Button
          active
          style={{ width: '80px', height: '32px', borderRadius: '40px' }}
        />
      ))}
    </div>
  );
};

export default FieldTypeFilter;
