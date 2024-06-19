'use client';
import React, { useState } from 'react';
import AccentButton from './components/AccentButton';

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
}

const FieldTypeFilter: React.FC<FieldTypeFilterProps> = ({ onSelect }) => {
  const [activeTab, setActiveTab] = useState('all');
  const handleClick = (value: string) => {
    setActiveTab(value);
    onSelect(value);
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
