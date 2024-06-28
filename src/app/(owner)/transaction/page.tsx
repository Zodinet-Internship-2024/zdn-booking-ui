'use client';

import Transaction from './components/Transaction';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { Button, Form, Select } from 'antd';
import { BOOKING_STATUS, BOOKING_STATUS_MAPPING } from '@/constants/constant';
import styles from './page.module.scss';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import DatePickerComponent from '@/components/common/DatePickerComponent';
import { Input } from 'antd';
import { CaretDownFilled, FilterFilled } from '@ant-design/icons';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

const { Search } = Input;

function Page() {
  const [status, setStatus] = useState<string>(BOOKING_STATUS[0]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<[Dayjs, Dayjs]>();
  const [input, setInput] = useState<string>('');
  const onFilter = () => {
    console.log('input', input);
    console.log('status', status);
    if (date) {
      console.log('date', date.format('DD/MM/YYYY'));
    } else console.log('date', date);
    if (time) {
      console.log('time', time[0].format('HH:mm'), time[1].format('HH:mm'));
      console.log('time', time);
    } else console.log('time', time);
  };

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-natural-700">Lịch Sử Giao Dịch</h4>
          <FieldTypeFilter />
        </div>
        <div className="flex flex-row items-center gap-5">
          <Search
            placeholder="Tìm kiếm giao dịch"
            className="body-3 text-natural-400"
            onChange={(event) => setInput(event.target.value)}
          />
          <Button className="" onClick={onFilter}>
            <FilterFilled style={{ color: '#C7C7C7', fontSize: '24px' }} />
            <p className="body-3 w-[30px] font-bold text-natural-700">Lọc</p>
          </Button>
        </div>
        <div className={`${styles.select} flex flex-row items-center gap-3`}>
          <p className="body-4 font-medium text-natural-700">
            Tình trạng đặt sân
          </p>
          <Select
            className={`h-12 w-48 ${styles.select}`}
            defaultValue={BOOKING_STATUS[0]}
            suffixIcon={<CaretDownFilled style={{ fontSize: '20px' }} />}
            options={BOOKING_STATUS.map((status) => ({
              label: BOOKING_STATUS_MAPPING[status],
              value: status,
            }))}
            onChange={(value) => setStatus(value)}
          />
        </div>
        <div className={`${styles.select} flex flex-row items-center gap-3`}>
          <p className="body-4 font-medium text-natural-700">
            Khoảng thời gian
          </p>
          <DatePickerComponent onChange={setDate} />
          <RangePickerComponent onChange={setTime} />
        </div>
      </div>
      <Transaction />
    </div>
  );
}

export default Page;


