'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type PrivateRouteProps = {
  children: React.ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user || session.user.role !== 'owner') {
      router.replace('/home');
    }
  }, [status, session, router]);

  return <>{children}</>;
};
export default PrivateRoute;
