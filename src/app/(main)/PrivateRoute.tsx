'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type PrivateRouteProps = {
  children: React.ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push('/login');
    return;
  }

  return <> {children}</>;
};
export default PrivateRoute;
