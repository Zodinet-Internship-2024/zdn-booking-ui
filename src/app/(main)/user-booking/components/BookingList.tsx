import Item from '@/components/common/Item';
import { groupBookingsByDay } from '@/utils/groupBookingsByDay';
import { useEffect, useState } from 'react';

//
interface BookingListProps {
  bookings: any;
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [groupBookings, setGroupBookings] = useState<any>();

  useEffect(() => {
    setGroupBookings(groupBookingsByDay(bookings));
  }, [bookings]);
  return (
    <div className="flex flex-col gap-8">
      {groupBookings &&
        Object.entries(groupBookings).map(([date, bookings]) => (
          <div key={date} className="flex flex-col gap-5">
            <span className="body-2 font-bold text-natural-700">{date}</span>
            <div className="flex flex-col gap-3">
              {(bookings as any[]).map((booking: any, index: number) => (
                <Item key={index} data={booking} label="user-booking" />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingList;
