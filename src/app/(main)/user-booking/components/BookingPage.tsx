//
'use client';
import { Pagination, PaginationProps } from 'antd';
import BookingList from './BookingList';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getUserBooking } from '../../api/user-booking.api';

function BookingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page');
  const status = searchParams.get('status') || 'all';

  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', status);
    params.set('page', pageNumber.toString());
    const url = `${pathname}?${params.toString()}` as any;

    router.replace(url, { scroll: false });
  };

  const fetchBookings = async () => {
    const fetchedBookings = await getUserBooking({
      status: status,
      page: page ? Number(page) : 1,
    }).then((res: any) => res.data);
    setBookings(fetchedBookings.data);
    setTotal(fetchedBookings.total);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);

    fetchBookings();
  }, [status, page]);

  return (
    <>
      {isLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <div className="flex flex-col gap-4 xl:gap-6">
          <BookingList bookings={bookings} />
          <div className="flex items-center justify-center">
            <Pagination
              defaultCurrent={page ? Number(page) : 1}
              total={total}
              showSizeChanger={false}
              pageSize={15}
              onChange={onChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default BookingPage;
