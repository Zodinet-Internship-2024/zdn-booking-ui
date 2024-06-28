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
