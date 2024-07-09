import { addTimezone, cn, timeAgo } from '@/libs/utils';
import Link from 'next/link';

type NotificationItemProps = {
  notification: NotificationType;
};

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const metadata = notification.metadata;
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-5">
        <Link
          href={metadata?.titleHref ?? '#'}
          className={cn(
            'body-4 truncate font-bold',
            notification.isRead && 'text-natural-400',
          )}
        >
          {notification.title}
        </Link>
        <span className="truncate text-xs text-primary-600">
          {timeAgo(addTimezone(new Date(notification.createdAt)))}
        </span>
      </div>
      <div>
        <Link
          href={metadata?.descHref ?? '#'}
          className="truncate text-xs text-natural-500"
        >
          {notification.description}
        </Link>
      </div>
    </section>
  );
};
export default NotificationItem;
