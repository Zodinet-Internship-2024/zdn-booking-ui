'use client';

import Transaction from './components/Transaction';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { Select, Input, Pagination, PaginationProps } from 'antd';
import { BOOKING_STATUS, BOOKING_STATUS_MAPPING } from '@/constants/constant';
import styles from './page.module.scss';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import DatePickerComponent from '@/components/common/DatePickerComponent';
import { CaretDownFilled, FilterFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getTransactions } from '../apis/transaction.api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const { Search } = Input;

function TransactionPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [status, setStatus] = useState<string>(BOOKING_STATUS[0]);
  const [date, setDate] = useState<Dayjs>();
  const [time, setTime] = useState<[Dayjs, Dayjs]>();
  const [input, setInput] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const type = searchParams.get('type');

  const fetchBookings = async () => {
    const fetchedBookings = await getTransactions({
      status,
      date: date ? date.format('YYYY-MM-DD') : undefined,
      startTime: time?.[0] ? time?.[0].format('HH:mm') : undefined,
      endTime: time?.[1] ? time?.[1].format('HH:mm') : undefined,
      name: input ? input : undefined,
      type: type ? type : undefined,
      page: page ? Number(page) : 1,
    }).then((res) => res.data);
    setBookings(fetchedBookings.data);
    setTotal(fetchedBookings.total);
    setIsLoading(false);
  };

  const onSearch = async () => {
    setIsLoading(true);
    fetchBookings();
  };

  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    if (type) params.set('type', type);
    params.set('page', pageNumber.toString());
    const url = `${pathname}?${params.toString()}` as any;

    router.replace(url, { scroll: false });
  };

  useEffect(() => {
    setIsLoading(true);

    fetchBookings();
  }, [status, date, time, type, page]);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     const fetchedBookings = await getTransactions({
  //       status,
  //       page: page ? Number(page) : 1,
  //     }).then((res) => res.data);
  //     setBookings(fetchedBookings.data);
  //     setTotal(fetchedBookings.total);
  //     setIsLoading(false);
  //   };
  //   // setType(searchParams.get('type') as string);
  //   fetchBookings();
  // }, []);

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
            value={input}
            placeholder="Tìm kiếm giao dịch"
            className="body-3 text-natural-400"
            onChange={(event) => setInput(event.target.value)}
            onClick={() => setInput('')}
            onSearch={onSearch}
          />
          {/* <Button className="" onClick={onFilter}>
            <FilterFilled style={{ color: '#C7C7C7', fontSize: '24px' }} />
            <p className="body-3 w-[30px] font-bold text-natural-700">Lọc</p>
          </Button> */}
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
      {isLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <>
          <Transaction bookings={bookings} />
          <div className="flex items-center justify-center">
            <Pagination
              defaultCurrent={page ? Number(page) : 1}
              total={total}
              showSizeChanger={false}
              pageSize={15}
              onChange={onChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionPage;
