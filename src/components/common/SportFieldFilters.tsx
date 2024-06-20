'use client';
import React from 'react';
import { FilterItem } from './components/FilterItem';
import { CloseOutlined } from '@ant-design/icons';
import AccentButton from './components/AccentButton';

const distanceFilter = {
  title: 'Khoang cach',
  name: 'distance',
  options: [
    {
      label: 'Gan nhat',
      value: 'near',
    },
    {
      label: 'Xa nhat',
      value: 'far',
    },
  ],
};

const priceFilter = {
  title: 'Gia ca',
  name: 'price',
  options: [
    {
      label: 'Thap nhat',
      value: 'low',
    },
    {
      label: 'Cao nhat',
      value: 'high',
    },
  ],
};

const timeFilter = {
  title: 'Thoi gian',
  name: 'time',
  options: [],
};

export const SportFieldFilters: React.FC = () => {
  const [isOpened, setIsOpened] = React.useState<boolean>(true);
  const [price, setPrice] = React.useState<string>(
    priceFilter.options[0].value,
  );

  const [isNeedReset, setIsNeedReset] = React.useState<boolean>(false);
  const [distance, setDistance] = React.useState<string>(
    distanceFilter.options[0].value,
  );

  const handleApplyFilter = () => {
    console.log('Distance: ', distance);
    console.log('Price: ', price);
  };

  const handleClearFilter = () => {
    setIsNeedReset(true);
  };

  return (
    <div
      className={`fixed right-0 top-0 flex h-screen w-[480px] flex-col items-center justify-between rounded-s-[40px] bg-neutral px-10 shadow-2xl ${
        isOpened
          ? 'z-10 translate-x-0 transform duration-1000'
          : 'z-0 translate-x-full transform duration-1000'
      }`}
    >
      <div className="flex w-[400px] flex-col gap-6">
        <div
          className={`body-1 flex h-[88px] flex-row items-center justify-between py-6 font-bold`}
        >
          <span>Bộ lọc</span>
          <button className="h-10 w-10" onClick={() => setIsOpened(false)}>
            <CloseOutlined style={{ fontSize: '24px' }} spin />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <FilterItem
            filter={distanceFilter}
            onFilterChange={setDistance}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
          ></FilterItem>

          <FilterItem
            filter={priceFilter}
            onFilterChange={setPrice}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
          ></FilterItem>

          <FilterItem
            filter={timeFilter}
            onFilterChange={() => {}}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
          ></FilterItem>
        </div>
      </div>

      <div className={`flex w-full flex-row gap-10 pb-10`}>
        <AccentButton
          label="Áp dụng"
          value="apply"
          isActive={true}
          onClick={handleApplyFilter}
          style="flex-grow"
        ></AccentButton>
        <button
          className={`border-b-2 border-natural-400 text-natural-400 hover:border-accent-600 hover:text-accent-600`}
          onClick={handleClearFilter}
        >
          <span className="w body-3 w-fit font-bold">Xoa bo loc</span>
        </button>
      </div>
    </div>
  );
};
