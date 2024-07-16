//
'use client';

import styles from './page.module.scss';
import OwnerBooking from './components/Booking';
import { Pagination, PaginationProps } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/libs/utils';

function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams.get('page');

  const params = new URLSearchParams({
    page: page ? page : '1',
  });

  const onChange: PaginationProps['onChange'] = (pageNumber: number) => {
    router.push(`${pathname}?page=${pageNumber}` as any, { scroll: false });
  };

  const {
    data: response,
    error,
    isLoading: swrLoading,
  } = useSWR(
    `/booking/owner?${params.toString()}`,
    (url: string) => fetcher(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <h4 className="font-bold text-natural-700">Đặt Chỗ</h4>
      </div>
      {swrLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <>
          <OwnerBooking bookings={response ? response.data.data : undefined} />
          <div className="flex items-center justify-center">
            <Pagination
              defaultCurrent={page ? Number(page) : 1}
              total={response ? response.data.total : 0}
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
