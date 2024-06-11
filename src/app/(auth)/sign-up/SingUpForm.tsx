'use client';

import React from 'react';
import { Button, Input } from 'antd';
import { FaArrowLeft } from 'react-icons/fa6';
import { cn } from '@/libs/utils';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import s from '../sign-up/signUp.module.scss';
import fb from '../../../../public/images/icons8-facebook (2) 1.svg';
import gg from '../../../../public/images/icons8-google 1.svg';
import Image from 'next/image';
export default function SingUpForm() {
    return (
        <div className="py-12">
            <div className="w-[620px]  bg-primary-100 rounded-[40px] border border--primary-400 p-10">
                <div className="flex items-center">
                    <FaArrowLeft className="text-xl mr-4" />
                    <span className="font-bold text-[28px] leading-7 cursor-pointer">Chủ sân</span>
                </div>
                <div className="mt-10">
                    <div className={cn(s.inputContainer, 'flex flex-col items-center')}>
                        <label
                            htmlFor="name"
                            className="text-primary-600 text-lg leading-6 font-bold mb-2"
                        >
                            Tên
                        </label>
                        <Input id="name" name="name" placeholder="Nhập tên" className="" />
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div
                            className={cn(
                                s.inputContainer,
                                'flex flex-col items-center w-1/2 mr-2'
                            )}
                        >
                            <label
                                htmlFor="email"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
                            >
                                Email
                            </label>
                            <Input id="email" name="email" placeholder="Nhập email" className="" />
                        </div>
                        <div
                            className={cn(
                                s.inputContainer,
                                'flex flex-col items-center w-1/2 ml-2'
                            )}
                        >
                            <label
                                htmlFor="phone"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
                            >
                                Số điện thoại
                            </label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="Nhập số điện thoại"
                                className=""
                            />
                        </div>
                    </div>
                    <div>
                        <div className={cn(s.inputContainer, 'flex flex-col items-center mt-6')}>
                            <label
                                htmlFor="name"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
                            >
                                Password
                            </label>
                            <Input.Password
                                placeholder="input password"
                                id="name"
                                name="name"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className={cn(s.inputContainer, 'flex flex-col items-center mt-6')}>
                            <label
                                htmlFor="name"
                                className="text-primary-600 text-lg leading-6 font-bold mb-2"
                            >
                                Confirm password
                            </label>
                            <Input.Password
                                placeholder="Nhập password"
                                id="name"
                                name="name"
                                iconRender={(visible) =>
                                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                }
                            />
                        </div>
                    </div>

                    <Button className="w-full my-6">0</Button>
                    <div>
                        <span className="text-base cursor-pointer underline underline-offset-4 font-medium text-primary-600 mt-3">
                            Bạn đã có tài khoản đăng nhập?
                        </span>
                    </div>
                    <div className=" flex flex-col justify-center items-center mt-10">
                        <span>Hoặc đăng nhập bằng</span>
                        <div className=" flex items-center  mt-4">
                            <div className="bg-primary-500 rounded-full w-fit p-3 mr-5 cursor-pointer">
                                <Image src={fb} w={24} height={24} />
                            </div>

                            <div className="bg-primary-500 rounded-full w-fit p-3 cursor-pointer">
                                <Image src={gg} w={24} height={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
