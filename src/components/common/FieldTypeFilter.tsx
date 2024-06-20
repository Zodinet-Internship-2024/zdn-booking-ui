'use client';
import React, { useState } from 'react';
import AccentButton from './components/AccentButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getValidFilterType } from '@/libs/utils';

const tabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Sân bóng rổ', value: 'basketball' },
  { label: 'Sân bóng chuyền', value: 'volleyball' },
  { label: 'Sân cầu lông', value: 'badminton' },
  { label: 'Sân tennis', value: 'tennis' },
  { label: 'Sân bóng đá', value: 'football' },
  { label: 'Sân bóng bàn', value: 'tableTennis' },
  { label: 'Bi-da', value: 'billiards' },
];

interface FieldTypeFilterProps {
  onSelect: (value: string) => void;
  name?: string;
}

const FieldTypeFilter: React.FC<FieldTypeFilterProps> = ({
  onSelect,
  name = 'type',
}) => {
  // const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = getValidFilterType(tabs, searchParams.get(name) as string);
  const handleClick = (value: string) => {
    // setActiveTab(value);
    onSelect(value);
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 xl:flex`}>
      {tabs.map((tab) => (
        <AccentButton
          key={tab.value}
          label={tab.label}
          value={tab.value}
          isActive={activeTab === tab.value}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default FieldTypeFilter;
