import { getBookingsByFieldId } from '@/libs/api/booking.api';
import { useEffect, useState } from 'react';

export type BookingResponse = {
  field: Field;
} & Booking;
const useBooking = (
  fieldId?: string | null,
  startTime?: Date | null,
  endTime?: Date | null,
  status?: BookingStatus,
) => {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!fieldId || !startTime || !endTime) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await getBookingsByFieldId(
          fieldId,
          startTime,
          endTime,
          status,
        );
        if (response?.data) {
          setBookings(response.data);
        }
      } catch (error) {
        setError('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [fieldId, startTime?.toLocaleString(), endTime?.toLocaleDateString()]);

  return { bookings, isLoading, error };
};
export default useBooking;
