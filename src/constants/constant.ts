export const AUTH_PROVIDERS = {
  KEYCLOAK: 'keycloak',
};

export const VALID_ROLES = ['user', 'owner'];

export const CATEGORY_MAPPING: { [key: string]: string } = {
  basketball: 'Sân bóng rổ',
  volleyball: 'Sân bóng chuyền',
  badminton: 'Sân cầu lông',
  tennis: 'Sân tennis',
  football: 'Sân bóng đá',
  tableTennis: 'Sân bóng bàn',
  billiards: 'Bi-da',
};

export const CRUD_ACTIONS: { [key: string]: string } = {
  create: 'Tạo',
  edit: 'Chỉnh sửa',
  view: 'Xem',
  delete: 'Xóa',
};

export const BOOKING_STATUS_MAPPING: { [key: string]: string } = {
  all: 'Tất cả',
  accepted: 'Đặt sân thành công',
  rejected: 'Hủy đặt sân',
  disabled: 'Hoàn thành',
  available: 'Sẵn sàng',
  booking: 'Đang đặt sân',
};

export const USER_BOOKING_STATUS_MAPPING: { [key: string]: string } = {
  all: 'Tất cả',
  accepted: 'Đặt sân thành công',
  rejected: 'Yêu cầu đặt sân đã bị hủy',
  disabled: 'Đã check-in',
  available: 'Sẵn sàng',
  booking: 'Yêu cầu chưa được duyệt',
};

export const TRANSACTION_STATUS: { [key: string]: string } = {
  all: 'Tất cả',
  rejected: 'Hủy đặt sân',
  accepted: 'Đặt sân thành công',
  disabled: 'Đặt sân thành công',
  available: 'Sẵn sàng',
  booking: 'Đang đặt sân',
};

export const BOOKING_STATUS = [
  'all',
  'accepted',
  'rejected',
  'disabled',
  'booking',
  'available',
];

export const DEFAULT_IMAGES = [
  'https://picsum.photos/360/360',
  'https://picsum.photos/360/361',
  'https://picsum.photos/360/362',
  'https://picsum.photos/360/363',
  'https://picsum.photos/360/364',
];

export const errorMessageMapping: Record<string, string> = {
  'There is a booking at this time': 'Đã có lịch đặt sân trong thời gian này',
  'Invalid booking time': 'Thời gian đặt sân không hợp lệ',
  'The field is not working at this time.':
    'Sân không hoạt động vào thời gian này',
  'Phone number is invalid': 'Số điện thoại không hợp lệ',
};