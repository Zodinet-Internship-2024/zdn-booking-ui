'use client';

import useFetchNotifications from '@/hooks/useNotifications';
import { groupNotificationsByDay } from '@/libs/utils';
import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = searchParams.get('page') ?? 1;
  const read = searchParams.get('read') ?? 'all';
  const size = 6;

  const { isLoading, notifications, totalPage } = useFetchNotifications({
    page: Number(page),
    size,
    read,
  });

  if (!notifications) {
    return null;
  }
  const groupedNotifications: Record<string, NotificationType[]> =
    groupNotificationsByDay(notifications);
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}` as any);
  };
  return (
    <div>
      {isLoading ? (
        <span className="body-3 font-normal text-natural-400">
          Vui lòng chờ ...
        </span>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {groupedNotifications &&
              Object.entries(groupedNotifications).map(
                ([date, notifications]) => (
                  <div key={date} className="flex flex-col gap-5">
                    <span className="body-2 font-bold text-natural-700">
                      {date}
                    </span>
                    <div className="flex flex-col gap-6">
                      {notifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </div>
                  </div>
                ),
              )}
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Pagination
              defaultCurrent={+page}
              total={totalPage * size}
              pageSize={size}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default NotificationList;
