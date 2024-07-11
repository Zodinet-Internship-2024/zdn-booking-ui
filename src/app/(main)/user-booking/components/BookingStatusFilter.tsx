//
'use client';
import AccentButton from '@/components/common/components/AccentButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  BOOKING_STATUS,
  BOOKING_STATUS_MAPPING,
  USER_BOOKING_STATUS_MAPPING,
} from '@/constants/constant';

const BookingStatusFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentTab = searchParams.get('status') || 'all';

  const handleChangeTab = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', value);
    params.set('page', '1');

    const url = `${pathname}?${params.toString()}` as any;

    router.replace(url, { scroll: false });
  };

  const handleClick = (value: string) => {
    handleChangeTab(value);
  };

  return (
    <div
      className={`grid grid-cols-2 gap-3 pb-2 md:grid-cols-3 lg:grid-cols-4 xl:flex xl:overflow-hidden xl:hover:overflow-x-auto`}
    >
      {BOOKING_STATUS.map((status) => {
        if (status !== 'available') {
          return (
            <AccentButton
              key={status}
              label={USER_BOOKING_STATUS_MAPPING[status]}
              value={status}
              isActive={currentTab === status}
              onClick={() => handleClick(status)}
            />
          );
        }
      })}
    </div>
  );
};

export default BookingStatusFilter;
