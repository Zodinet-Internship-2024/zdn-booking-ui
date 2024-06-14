import OwnerHeader from '@/components/header/owner-customer/OwnerHeader';

type OwnerLayoutProps = {
  children: React.ReactNode;
};

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <main>
      <OwnerHeader />
      {children}
    </main>
  );
}
