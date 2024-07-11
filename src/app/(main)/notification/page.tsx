import { Metadata } from 'next';
import NotificationsSection from './components/NotificationsSection';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Thông báo',
  description: 'Thông báo',
};

const NotificationPage = () => {
  return (
    <div className="h-1 w-full flex-grow bg-primary-100">
      <NotificationsSection />
    </div>
  );
};
export default NotificationPage;
