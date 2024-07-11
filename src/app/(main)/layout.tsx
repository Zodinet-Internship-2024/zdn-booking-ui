import CustomerHeader from '@/components/header/customer-header/CustomerHeader';
import GetLocation from '@/components/location/GetLocation';
import PrivateRoute from './PrivateRoute';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
  return (
    <PrivateRoute>
      <main className="relative flex min-h-screen flex-col">
        <CustomerHeader />
        {children}
      </main>
      <GetLocation />
    </PrivateRoute>
  );
}
