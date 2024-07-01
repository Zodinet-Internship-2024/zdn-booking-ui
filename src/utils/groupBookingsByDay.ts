// utils/groupBookingsByDay.ts

interface BookingsGroupedByDay {
  [date: string]: any[];
}

export const groupBookingsByDay = (bookings: any[]): BookingsGroupedByDay => {
  if (bookings.length === 0) {
    return {};
  }

  return bookings.reduce((groupedBookings, booking) => {
    const date = new Date(booking.startTime).toISOString().split('T')[0];
    if (!groupedBookings[date]) {
      groupedBookings[date] = [];
    }
    groupedBookings[date].push(booking);
    return groupedBookings;
  }, {} as BookingsGroupedByDay);
};
