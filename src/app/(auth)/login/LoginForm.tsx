"use client";
import TextError from "@/components/error/TextError";
import { AUTH_PROVIDERS } from '@/constants/constant';
import { cn, getValidRole } from '@/libs/utils';
import { loginSchema } from '@/zod-schemas/login-schema';
import { Button, Input, message } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa6';
import { z } from 'zod';
import s from './login.module.scss';
type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({
    mode: 'onBlur',
  });
  const searchParams = useSearchParams();
  const role = getValidRole(searchParams.get('role') as string);
  const { data: session } = useSession();
  if (!mounted) return <></>;

  if (session?.user) {
    router.push(`/home`);
  }

  async function onFocus() {
    setErrorMessage('');
  }

  async function onSubmit({ username, password }: FormData) {
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMessage('Tài khoản hoặc mật khẩu không đúng');
      return;
    }

    messageApi.open({
      type: 'success',
      content: 'Đăng nhập thành công',
    });
  }

  const handleSocialLogin = async () => {
    await signIn(AUTH_PROVIDERS.KEYCLOAK, {
      callbackUrl: `/verify-user?role=${role}`,
      redirect: true,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="mx-auto py-4">
        <div className="border--primary-400 mx-auto w-[620px] rounded-[40px] border bg-primary-100 p-10">
          <div className="flex items-center">
            <Link href="/role" className="flex cursor-pointer items-center">
              <FaArrowLeft className="mr-4 text-xl" />
              <span className="text-[28px] font-bold leading-7">
                {role === 'owner' ? 'Chủ sân' : 'Người thuê'}
              </span>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(s.formContainer, 'mt-10')}
          >
            <div
              className={cn(
                s.inputContainer,
                'flex flex-col items-center space-y-1',
              )}
            >
              <label
                htmlFor="username"
                className="mb-2 text-lg font-bold leading-6 text-primary-600"
              >
                Email/Số điện thoại
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    id="username"
                    placeholder="Nhập email"
                    className=""
                    status={errorMessage ? 'error' : ''}
                    {...field}
                    onFocus={onFocus}
                  />
                )}
              />
            </div>
            <div
              className={cn(
                s.inputContainer,
                'mb-2 mt-6 flex flex-col items-center space-y-1',
              )}
            >
              <label
                htmlFor="password"
                className="mb-2 text-lg font-bold leading-6 text-primary-600"
              >
                Password
              </label>

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    placeholder="Nhập Password"
                    id="password"
                    status={errorMessage ? 'error' : ''}
                    {...field}
                    onFocus={onFocus}
                  />
                )}
              />
            </div>
            <TextError error={errorMessage} />

            <Button
              htmlType="submit"
              className="mb-6 mt-2 w-full"
              disabled={isSubmitting}
            >
              Đăng nhập
            </Button>
            <div>
              <Link
                href={`/sign-up?role=${role}`}
                className="mt-3 cursor-pointer text-base font-medium text-primary-600 underline underline-offset-4"
              >
                Bạn chưa có tài khoản đăng nhập?
              </Link>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center">
              <span>Hoặc đăng nhập bằng</span>
              <div className="mt-4 flex items-center">
                <div
                  className="mr-5 w-fit cursor-pointer rounded-full bg-primary-500 p-3"
                  onClick={handleSocialLogin}
                >
                  <Image
                    src="/images/icon-facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>

                <div
                  className="w-fit cursor-pointer rounded-full bg-primary-500 p-3"
                  onClick={handleSocialLogin}
                >
                  <Image
                    src="/images/icon-google.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
