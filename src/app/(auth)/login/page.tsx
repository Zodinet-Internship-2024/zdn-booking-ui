import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Login Page',
  description: 'Zodinet Booking - Login: Login to Your Account',
}

const LoginPage = async () => {
  return <LoginForm />;
};
export default LoginPage;
