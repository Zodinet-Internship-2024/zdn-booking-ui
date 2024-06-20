'use client';
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';

import { cn } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import s from '../sign-up/signUp.module.scss';

import Errors from '@/components/errors/errors';
import { AUTH_PROVIDERS, VALID_ROLES } from '@/constants/constant';
import { SignUpSchema } from '@/zod-schemas/signup-schema';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import fb from '../../../../public/images/icon-facebook.svg';
import gg from '../../../../public/images/icon-google.svg';
import { signUpUser } from '../apis/auth.api';

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updateSearchParams = () => {
      const params = new URLSearchParams(searchParams);

      const role = searchParams.get('role') as string;

      if (!VALID_ROLES.includes(role)) {
        params.set('role', 'user');
        router.push(`sign-up?${params.toString()}`);
      }
    };

    updateSearchParams();
  }, [searchParams, router]);
  const role = searchParams.get('role');
  const {
    control,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const dataBody = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: role ? role : process.env.NEXT_PUBLIC_ROLE_USER,
      accountType: 'manual',
    };

    const res = await signUpUser(dataBody);
    console.log(res);
    if (res.status === 'Success') {
      messageApi.open({
        type: 'success',
        content: 'Đăng kí thành công',
      });

      router.push(`/login?role=${role}`);
    } else {
      messageApi.open({
        type: 'error',
        content: res.message,
      });
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    await signIn(AUTH_PROVIDERS.KEYCLOAK, {
      callbackUrl: `/verify-user?role=${role}`,
      redirect: true,
    });
  };
  return (
    <>
      {contextHolder}
      <div className="py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border--primary-400 w-[620px] rounded-[40px] border bg-primary-100 p-10"
        >
          <div className="flex items-center">
            <ArrowLeftOutlined className="mr-4 text-xl" />
            <Link
              href="/role"
              className="cursor-pointer text-[28px] font-bold leading-7"
            >
              {role === process.env.NEXT_PUBLIC_ROLE_OWNER
                ? 'Chủ sân'
                : 'Người thuê'}
            </Link>
          </div>
          <div className={cn(s.main, 'mt-10')}>
            <div className={cn(s.inputContainer, 'flex flex-col items-center')}>
              <label
                htmlFor="name"
                className="mb-2 text-lg font-bold leading-6 text-primary-600"
              >
                Tên
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input id="name" placeholder="Nhập tên" {...field} />
                )}
              />
              {<Errors error={errors.name} />}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div
                className={cn(
                  s.inputContainer,
                  'mr-2 flex w-1/2 flex-col items-center',
                )}
              >
                <label
                  htmlFor="email"
                  className="mb-2 text-lg font-bold leading-6 text-primary-600"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input id="email" placeholder="Nhập email" {...field} />
                  )}
                />
                {<Errors error={errors.email} />}
              </div>
              <div
                className={cn(
                  s.inputContainer,
                  'ml-2 flex w-1/2 flex-col items-center',
                )}
              >
                <label
                  htmlFor="phone"
                  className="mb-2 text-lg font-bold leading-6 text-primary-600"
                >
                  Số điện thoại
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ pattern: /^[0-9]*$/ }}
                  render={({ field }) => (
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      {...field}
                    />
                  )}
                />
                <span className="h-3 text-red-500">
                  {<Errors error={errors.phone} />}
                </span>
              </div>
            </div>
            <div
              className={cn(
                s.inputContainer,
                'mt-6 flex flex-col items-center',
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
                    placeholder="Nhập password"
                    id="password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...field}
                  />
                )}
              />
              {<Errors error={errors.password} />}
            </div>
            <div
              className={cn(
                s.inputContainer,
                'mt-6 flex flex-col items-center',
              )}
            >
              <label
                htmlFor="confirmPassword"
                className="mb-2 text-lg font-bold leading-6 text-primary-600"
              >
                Confirm password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    placeholder="Nhập password"
                    id="confirmPassword"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...field}
                  />
                )}
              />
              {<Errors error={errors.confirmPassword} />}
            </div>
            <div className="mb-4 mt-6">
              <Button
                htmlType="submit"
                type="primary"
                className="w-full"
                loading={loading}
              >
                Đăng kí
              </Button>
            </div>
            <div>
              <Link
                href={`/login?role=${role}`}
                className="mt-3 cursor-pointer text-base font-medium text-primary-600 underline underline-offset-4"
              >
                Bạn đã có tài khoản đăng nhập?
              </Link>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center">
              <span>Hoặc đăng nhập bằng</span>
              <div className="mt-4 flex items-center">
                <div
                  className="mr-5 w-fit cursor-pointer rounded-full bg-primary-500 p-3"
                  onClick={() => handleSocialLogin()}
                >
                  <Image src={fb} alt="Facebook" width={24} height={24} />
                </div>

                <div
                  className="w-fit cursor-pointer rounded-full bg-primary-500 p-3"
                  onClick={() => handleSocialLogin()}
                >
                  <Image src={gg} alt="Google" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
