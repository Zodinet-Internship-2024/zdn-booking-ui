'use client';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

type PrivateRouteProps = {
  children: React.ReactNode;
};
const PrivateRoute = async ({ children }: PrivateRouteProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  if (!session?.user) {
    router.push('/role');
  }
  if (session?.user?.role !== 'owner') {
    router.push('/home');
  }

  return <>{children}</>;
};
export default PrivateRoute;
