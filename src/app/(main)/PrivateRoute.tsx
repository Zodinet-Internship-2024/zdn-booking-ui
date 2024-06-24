// 'use client';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

type PrivateRouteProps = {
  children: React.ReactNode;
};
const PrivateRoute = async ({ children }: PrivateRouteProps) => {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/role');
  }

  return <>{children}</>;
};
export default PrivateRoute;
