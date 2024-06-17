'use client';
import TextError from '@/components/error/TextError';

import { cn } from '@/libs/utils';
import { loginSchema } from '@/zod-schemas/login-schema';
import { Button, Input, notification } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import s from './login.module.scss';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeftOutlined } from '@ant-design/icons';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [api, contextHolder] = notification.useNotification();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const { data: session } = useSession();

  if (session?.user) {
    router.push('/home');
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

    api['success']({
      message: 'Đăng nhập thành công',
      placement: 'top',
      showProgress: true,
      pauseOnHover: false,
    });
  }

  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  return (
    <>
      {contextHolder}
      <div className="mx-auto py-4">
        <div className="border--primary-400 mx-auto w-[620px] rounded-[40px] border bg-primary-100 p-10">
          <div className="flex items-center">
            <Link href="/role" className="flex cursor-pointer items-center">
              <ArrowLeftOutlined className="mr-4 text-xl" />
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
                <div className="mr-5 w-fit cursor-pointer rounded-full bg-primary-500 p-3">
                  <Image
                    src="/images/icon-facebook.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>

                <div className="w-fit cursor-pointer rounded-full bg-primary-500 p-3">
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
