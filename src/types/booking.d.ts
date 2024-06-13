type BookingStatus = 'disabled' | 'rejected' | 'available' | 'accepted' | 'booking';

type Booking = {
    id: string;
    phone: string;
    fullName: string;
    startTime: Date;
    endTime: Date;
    amount: number;
    status: BookingStatus;
};
