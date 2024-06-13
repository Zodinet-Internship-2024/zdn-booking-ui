export const sportField: SportField = {
    id: '1',
    name: 'City Soccer Field',
    quantity: 2,
    phone: '1234567890',
    startTime: new Date('2024-06-01T08:00:00Z'),
    endTime: new Date('2024-06-01T22:00:00Z'),
    price: 50.0,
    rule: 'No smoking, no pets allowed.',
    sportFieldType: {
        id: '1',
        name: 'Bóng đá',
    },
    sportFieldImages: [
        {
            id: '1',
            url: 'https://www.google.com',
            name: 'City Soccer Field',
        },
    ],
    location: {
        id: '1',
        addressDetail: '123 Phan Van Tri, Go Vap, Ho Chi Minh',
        latitude: 10.8505,
        longitude: 106.761,
        province: {
            id: '1',
            name: 'Ho Chi Minh',
        },
        district: {
            id: '1',
            name: 'Go Vap',
            provinceId: '1',
        },
        ward: {
            id: '1',
            name: 'Ward 1',
            districtId: '1',
        },
    },
    fields: [
        {
            id: '1',
            name: 'Sân A',
            bookings: [
                {
                    id: '1',
                    startTime: new Date('2024-06-01T08:00:00Z'),
                    amount: 50.0,
                    endTime: new Date('2024-06-01T10:00:00Z'),
                    fullName: 'Nguyen Van A',
                    phone: '1234567890',
                    status: 'booking',
                },
            ],
        },
    ],
};
