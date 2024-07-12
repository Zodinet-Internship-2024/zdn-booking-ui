export const validatePhone = (value: string): string => {
    const phoneRegex = /^0\d{9}$/;
    if (value.length !== 10) {
      return 'Số điện thoại phải là 10 số.';
    }
    if (!phoneRegex.test(value)) {
      return 'Số điện thoại phải hợp lệ.';
    }
  return '';
};
