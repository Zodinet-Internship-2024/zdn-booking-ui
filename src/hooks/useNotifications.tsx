import { getNotifications, markAsReads } from '@/libs/api/notification.api';
import { useEffect, useId, useRef, useState } from 'react';
import useServerSentEvents from './useServerSentEvents';

export type NotificationFilterType = {
  page?: number;
  size?: number;
  read?: string;
};
const useFetchNotifications = ({
  page = 1,
  size = 6,
  read = 'all',
}: NotificationFilterType) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const prevRef = useRef<NotificationType[]>(notifications);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    prevRef.current = notifications;
  }, [notifications]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getNotifications({
          page,
          size,
          read,
        });
        setTotalPage(response.totalPage);
        setNotifications(response.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();

    return () => {
      const ids = prevRef.current.map((notification) => notification.id);
      markAsReads(ids);
    };
  }, [page, size, read]);

  useServerSentEvents((data) => {
    const newNotification = JSON.parse(data);
    setNotifications((prev) => {
      return [newNotification, ...prev];
    });
  });

  return { notifications, isLoading, error, totalPage };
};
export default useFetchNotifications;
