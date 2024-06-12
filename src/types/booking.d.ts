enum BookingStatus {
    disabled = 'disabled',
    rejected = 'rejected',
    available = 'available',
    accepted = 'accepted',
    booking = 'booking',
}

type Booking = {
    id: string;
    phone: string;
    fullName: string;
    startTime: Date;
    endTime: Date;
    amount: number;
    status: BookingStatus;
};
