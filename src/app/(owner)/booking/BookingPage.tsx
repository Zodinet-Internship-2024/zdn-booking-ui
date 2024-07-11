'use client';

import styles from './page.module.scss';
import OwnerBooking from './components/Booking';
import { getOwnerBookings } from '../apis/booking.api';
import { useEffect, useState } from 'react';
import { Pagination, PaginationProps } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function BookingPage() {
  const [bookings, setBookings] = useState<any[]>([]); // Add state for bookings
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page');
  // const type = searchParams.get('type');

  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    router.push(`${pathname}?page=${pageNumber}` as any, { scroll: false });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      const fetchedBookings = await getOwnerBookings(
        page ? Number(page) : 1,
      ).then((res) => res.data);

      setBookings(fetchedBookings.data);
      setTotal(fetchedBookings.total);
      setIsLoading(false);
    };

    fetchBookings();
  }, [page]);

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <h4 className="font-bold text-natural-700">Đặt Chỗ</h4>
      </div>
      {isLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <>
          <OwnerBooking bookings={bookings} />
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

export default BookingPage;
