import { getUnreadNotificationsCount } from '@/libs/api/notification.api';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useServerSentEvents from './useServerSentEvents';

export type NotificationFilterType = {
  page?: number;
  size?: number;
};

const useUnreadNotificationCount = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getUnreadNotificationsCount();

        if (response) {
          setCount(+response);
        }
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  useServerSentEvents(() => setCount((prev) => prev + 1));

  return { count, setCount, isLoading, error };
};
export default useUnreadNotificationCount;
