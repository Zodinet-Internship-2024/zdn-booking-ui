import { getValidRole } from '@/libs/utils';
import { cookies } from 'next/headers';
import { createSocialUser } from '../apis/auth.api';
import { redirect } from 'next/navigation';

type VerifyUserPageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const VerifyUserPage = async ({ searchParams }: VerifyUserPageProps) => {
  const role = getValidRole(searchParams?.role as string);
  const res = await createSocialUser(
    cookies().get('access_token')?.value as string,
    role,
  );

  if (res) {
    redirect('/home');
  }

  return <></>;
};
export default VerifyUserPage;
