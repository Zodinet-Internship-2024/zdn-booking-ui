'use client';
import authApi from '@/app/apis/auth.api';
import TextError from '@/components/error/TextError';
import { cn } from '@/libs/utils';
import { loginSchema } from '@/zod-schemas/login-schema';
import { Button, Input, message } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import s from './login.module.scss';

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<FormData>({
        mode: 'onBlur',
    });

    async function onFocus() {
        setErrorMessage('');
    }

    async function onSubmit({ username, password }: FormData) {
        try {
            await authApi.signIn(username, password);

            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
        } catch (error) {
            console.error(error);
            setErrorMessage('Tài khoản hoặc mật khẩu không đúng');
        }
    }

    return (
        <>
            {contextHolder}
            <div className="py-4 mx-auto">
                <div className="w-[620px] bg-primary-100 rounded-[40px] border border--primary-400 p-10 mx-auto">
                    <div className="flex items-center">
                        <span className="font-bold text-[28px] leading-7 cursor-pointer">
                            Chủ sân
                        </span>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={cn(s.formContainer, 'mt-10')}
                    >
                        <div
                            className={cn(s.inputContainer, 'flex flex-col items-center space-y-1')}
                        >
                            <label
                                htmlFor="username"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
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
                                'flex flex-col items-center mt-6 mb-2 space-y-1'
                            )}
                        >
                            <label
                                htmlFor="password"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
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
                            className="w-full mt-2 mb-6"
                            disabled={isSubmitting}
                        >
                            Đăng nhập
                        </Button>
                        <div>
                            <span className="text-base cursor-pointer underline underline-offset-4 font-medium text-primary-600 mt-3">
                                Bạn chưa có tài khoản đăng nhập?
                            </span>
                        </div>
                        <div className=" flex flex-col justify-center items-center mt-10">
                            <span>Hoặc đăng nhập bằng</span>
                            <div className=" flex items-center  mt-4">
                                <div className="bg-primary-500 rounded-full w-fit p-3 mr-5 cursor-pointer">
                                    <Image
                                        src="/images/icon-facebook.svg"
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                </div>

                                <div className="bg-primary-500 rounded-full w-fit p-3 cursor-pointer">
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
