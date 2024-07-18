'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type PrivateRouteProps = {
  children: React.ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session } = useSession();

  if (session?.user?.role !== 'owner') {
    redirect('/home');
  }

  return <>{children}</>;
};
export default PrivateRoute;
