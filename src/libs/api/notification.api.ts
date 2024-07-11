import { NotificationFilterType } from '@/hooks/useNotifications';
import axiosInstance from '../axios';

export const getNotifications = async ({
  page = 1,
  size = 6,
  read = 'all',
}: NotificationFilterType) => {
  const readParam = read === 'all' ? '' : `&read=${read}`;
  const response = await axiosInstance.get(
    `/notification/me?page=${page - 1}&size=${size}${readParam}`,
  );
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await axiosInstance.get('/notification/me/unread/number');
  return response.data;
};

export const markAsReads = async (ids: string[]) => {
  await axiosInstance.patch('/notification/me', {
    ids,
  });
};

