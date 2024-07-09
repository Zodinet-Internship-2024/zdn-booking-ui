import { Metadata } from 'next';
import NotificationsSection from './components/NotificationsSection';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Thông báo',
  description: 'Thông báo',
};

const NotificationPage = () => {
  return <NotificationsSection />;
};
export default NotificationPage;
