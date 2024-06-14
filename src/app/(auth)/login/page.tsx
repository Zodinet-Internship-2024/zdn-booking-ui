import { getServerSession } from 'next-auth';
import LoginForm from './LoginForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getSession } from 'next-auth/react';

const LoginPage = async () => {
  return <LoginForm />;
};
export default LoginPage;
