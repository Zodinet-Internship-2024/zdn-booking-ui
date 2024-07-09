import { NotificationFilterType } from '@/hooks/useNotifications';
import axiosInstance from '../axios';

export const getNotifications = async ({
  page = 1,
  size = 6,
}: NotificationFilterType) => {
  const response = await axiosInstance.get('/notification/me', {
    params: {
      page: page - 1,
      size,
    },
  });
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

