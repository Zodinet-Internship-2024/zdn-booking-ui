import OwnerHeader from '@/components/header/owner-customer/OwnerHeader';

type OwnerLayoutProps = {
  children: React.ReactNode;
};

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <main className="flex h-screen flex-col">
      <OwnerHeader />
      <div className="flex-grow bg-[#f7f7f7]">{children}</div>
    </main>
  );
}
