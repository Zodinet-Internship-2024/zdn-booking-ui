import OwnerHeader from '@/components/header/owner-customer/OwnerHeader';

type OwnerLayoutProps = {
  children: React.ReactNode;
};

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  return (
    <main className="relative flex h-full min-h-screen flex-col">
      <OwnerHeader />
      <div className="flex-1 flex-grow bg-[#f7f7f7]">{children}</div>
    </main>
  );
}
