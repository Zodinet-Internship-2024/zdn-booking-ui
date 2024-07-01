import CustomerHeader from '@/components/header/customer-header/CustomerHeader';
import PrivateRoute from './PrivateRoute';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
  return (
    <PrivateRoute>
      <main className="relative">
        <CustomerHeader />
        {children}
      </main>
    </PrivateRoute>
  );
}
