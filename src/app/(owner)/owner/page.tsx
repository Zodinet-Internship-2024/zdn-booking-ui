import { tabs } from '@/components/common/FieldTypeFilter';
import { getUserSportFields } from './api/sportField.api';
import SportFieldManagement from './components/SportFieldManagement';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export const revalidate = false;
export const metadata: Metadata = {
  title: 'Zodinet Booking - Owner Home Page',
  description:
    'Zodinet Booking - Owner Home: Manage Your Sport Fields with Ease',
};

type OwnerHomePageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const OwnerHomePage = async ({ searchParams }: OwnerHomePageProps) => {

  const typeId = searchParams?.type;

  if (!typeId) {
    redirect('/owner?type=all');
  }

  return (
    <div className="flex h-full w-full items-end justify-center">
      <SportFieldManagement />
    </div>
  );
};
export default OwnerHomePage;
