'use client';
import React, { useEffect } from 'react';
import { FilterItem } from './components/FilterItem';
import { CloseOutlined } from '@ant-design/icons';
import AccentButton from './components/AccentButton';
import {
  usePathname,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { message } from 'antd';

const distanceFilter = {
  title: 'Khoảng cách',
  name: 'distanceOrder',
  options: [
    {
      label: 'Mặc định',
      value: '',
    },
    {
      label: 'Gần nhất',
      value: 'ASC',
    },
    {
      label: 'Xa nhất',
      value: 'DESC',
    },
  ],
};

const priceFilter = {
  title: 'Giá cả',
  name: 'priceOrder',
  options: [
    {
      label: 'Mặc định',
      value: '',
    },
    {
      label: 'Thấp nhất',
      value: 'ASC',
    },
    {
      label: 'Cao nhất',
      value: 'DESC',
    },
  ],
};

const timeFilter = {
  title: 'Thời gian',
  name: 'time',
  options: [],
};

interface FilterProps {
  isOpen: boolean;
  onClick: (value: boolean) => void;
}

export const SportFieldFilters: React.FC<FilterProps> = ({
  isOpen,
  onClick,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = React.useState<boolean>(isOpen);
  const [isNeedReset, setIsNeedReset] = React.useState<boolean>(false);
  const [openTab, setOpenTab] = React.useState<string>('distanceOrder');

  const [price, setPrice] = React.useState<string>(
    searchParams.get('price') || priceFilter.options[0].value,
  );
  const [distance, setDistance] = React.useState<string>(
    searchParams.get('distance') || distanceFilter.options[0].value,
  );
  const [timeDate, setTimeDate] = React.useState<string>('');

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams);
    const { date, start, end } = timeDate
      ? JSON.parse(timeDate)
      : {
          date: '',
          start: '',
          end: '',
        };
    if (date && start && end) {
      params.set('date', date);
      params.set('start', start);
      params.set('end', end);
    } else {
      params.delete('date');
      params.delete('start');
      params.delete('end');
    }

    if (distance) {
      params.set('distance', distance);
    } else {
      params.delete('distance');
    }

    if (price) {
      params.set('price', price);
    } else {
      params.delete('price');
    }

    router.push(`${pathname}?${params.toString()}` as any);

    if (date && start && end) handleCloseFilter(false);
    if (date === '' && start === '' && end === '') handleCloseFilter(false);
    if (date)
      if (start === '' || end === '')
        message.error('Vui lòng chọn thời gian bắt đầu và kết thúc');
  };

  const handleClearFilter = () => {
    setIsNeedReset(true);
    setDistance(distanceFilter.options[0].value);
    setPrice(priceFilter.options[0].value);
    setTimeDate('');
  };

  const handleCloseFilter = (value: boolean) => {
    setIsOpened(value);
    onClick(false);
  };

  useEffect(() => {
    setIsOpened(isOpen);
  }, [isOpen]);

  // useEffect(() => {
  //   onClick(isOpened);
  // }, [isOpened]);

  return (
    <div
      className={`fixed right-0 top-0 flex h-screen w-[480px] flex-col items-center justify-between rounded-s-[40px] bg-neutral px-10 shadow-2xl ${
        isOpened
          ? 'z-10 translate-x-0 transform duration-1000'
          : 'z-0 translate-x-full transform duration-1000'
      }`}
    >
      <div className="flex w-[400px] flex-col gap-3 2xl:gap-6">
        <div
          className={`body-1 flex flex-row items-center justify-between py-2 font-bold 2xl:h-[88px] 2xl:py-6`}
        >
          <span>Bộ lọc</span>
          <button
            disabled={!isOpened}
            className="h-10 w-10 hover:text-accent-600"
            onClick={() => handleCloseFilter(false)}
          >
            <CloseOutlined
              style={{ fontSize: '24px' }}
              className="hover-spin"
            />
          </button>
        </div>
        <div className="flex flex-col gap-4 2xl:gap-8">
          <FilterItem
            defaultFilter={distance}
            filter={distanceFilter}
            onFilterChange={setDistance}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
            openTab={openTab}
            setOpenTab={setOpenTab}
          ></FilterItem>

          <FilterItem
            defaultFilter={price}
            filter={priceFilter}
            onFilterChange={setPrice}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
            openTab={openTab}
            setOpenTab={setOpenTab}
          ></FilterItem>

          <FilterItem
            filter={timeFilter}
            onFilterChange={setTimeDate}
            isNeedReset={isNeedReset}
            setIsNeedReset={() => setIsNeedReset(false)}
            openTab={openTab}
            setOpenTab={setOpenTab}
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
