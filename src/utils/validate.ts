export const validatePhone = (value: string): string => {
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(value)) {
    return 'Số điện thoại phải là 10 số.';
  }
  return '';
};
