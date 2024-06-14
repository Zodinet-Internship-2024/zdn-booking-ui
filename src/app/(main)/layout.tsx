import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import PrivateRoute from './PrivateRoute';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: HomeLayoutProps) {
  return (
    <PrivateRoute>
      <main>
        <Header />
        {children}
      </main>
    </PrivateRoute>
  );
}
