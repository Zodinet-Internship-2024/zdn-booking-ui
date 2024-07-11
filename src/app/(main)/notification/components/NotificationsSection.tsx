'use client';

import useUnreadNotificationCount from '@/hooks/useUnreadNotificationCount';
import NotificationList from './NotificationList';
import NotificationFilter from './NotificationFilter';

const NotificationsSection = () => {
  const { count = 0 } = useUnreadNotificationCount();

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 rounded-3xl bg-neutral-50 p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3`}
    >
      <div className="flex flex-col gap-5">
        <h4 className="font-bold text-natural-700">
          Thông báo {count ? `(${count})` : ''}
        </h4>
      </div>
      <div>
        <NotificationFilter />
      </div>
      <NotificationList />
    </div>
  );
};
export default NotificationsSection;
