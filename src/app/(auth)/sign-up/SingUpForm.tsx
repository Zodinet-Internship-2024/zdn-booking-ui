'use client';

import React from "react";
import { Button, Input } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/libs/utils";
import s from "../sign-up/signUp.module.scss";

import fb from "../../../../public/images/icons8-facebook (2) 1.svg";
import gg from "../../../../public/images/icons8-google 1.svg";
import Errors from "@/components/errors/errors";
import { signUpUser } from "@/app/apis/auth.api";
import { SignUpSchema } from "@/zod-schemas/signup-schema";
import { useSearchParams } from "next/navigation";

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const searchParams = useSearchParams();

  let role = searchParams.get("role");

  if (role === "" || role === null) return (role = "user");

  const {
    control,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: any) => {
    const dataBody = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role,
      accountType: "manual",
    };

    const res = await signUpUser(dataBody);
    console.log(res);
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[620px] bg-primary-100 rounded-[40px] border border--primary-400 p-10"
      >
        <div className="flex items-center">
          <FaArrowLeft className="text-xl mr-4" />
          <span className="font-bold text-[28px] leading-7 cursor-pointer">
            Chủ sân
          </span>
        </div>
        <div className={cn(s.main, "mt-10")}>
          <div className={cn(s.inputContainer, "flex flex-col items-center")}>
            <label
              htmlFor="name"
              className="text-primary-600 text-lg leading-6 font-bold mb-2"
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

          <div className="flex items-center justify-between mt-6">
            <div
              className={cn(
                s.inputContainer,
                "flex flex-col items-center w-1/2 mr-2"
              )}
            >
              <label
                htmlFor="email"
                className="text-primary-600 text-lg leading-6 font-bold mb-2"
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
                "flex flex-col items-center w-1/2 ml-2"
              )}
            >
              <label
                htmlFor="phone"
                className="text-primary-600 text-lg leading-6 font-bold mb-2"
              >
                Số điện thoại
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    {...field}
                  />
                )}
              />
              <span className="text-red-500 h-3">
                {<Errors error={errors.phone} />}
              </span>
            </div>
          </div>
          <div
            className={cn(s.inputContainer, "flex flex-col items-center mt-6")}
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
            className={cn(s.inputContainer, "flex flex-col items-center mt-6")}
          >
            <label
              htmlFor="confirmPassword"
              className="text-primary-600 text-lg leading-6 font-bold mb-2"
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
          <div className="mt-6 mb-4">
            <Button htmlType="submit" type="primary" className="w-full ">
              Đăng kí
            </Button>
          </div>
          <div>
            <span className="text-base cursor-pointer underline underline-offset-4 font-medium text-primary-600 mt-3">
              Bạn đã có tài khoản đăng nhập?
            </span>
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <span>Hoặc đăng nhập bằng</span>
            <div className="flex items-center mt-4">
              <div className="bg-primary-500 rounded-full w-fit p-3 mr-5 cursor-pointer">
                <Image src={fb} alt="Facebook" width={24} height={24} />
              </div>

              <div className="bg-primary-500 rounded-full w-fit p-3 cursor-pointer">
                <Image src={gg} alt="Google" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
