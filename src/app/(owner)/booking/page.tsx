'use server';

import styles from './page.module.scss';
import OwnerBooking from './components/Booking';
import { getOwnerBookings } from '../apis/booking.api';

async function Page() {
  const bookings = await getOwnerBookings();

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <h4 className="font-bold text-natural-700">Đặt Chỗ</h4>
      </div>
      <OwnerBooking bookings={bookings} />
    </div>
  );
}

export default Page;
