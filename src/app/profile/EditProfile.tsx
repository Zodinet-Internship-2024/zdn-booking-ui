"use client";
import Image from "next/image";
import UploadAvatar from "./UploadAvatar";
import { Button, Input } from "antd";
import { cn } from "@/libs/utils";
import s from "./editProfile.module.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";

export default function EditProfile() {
  return (
    <div className="bg-primary-100 rounded-large flex flex-col gap-5 p-10 w-1/2">
      <div className="flex items-center">
        <FaArrowLeft className="text-xl mr-4" />
        <span className="font-bold text-[28px] leading-7 cursor-pointer">
          Edit profile
        </span>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="w-[84px] h-[84px] self-center mb-10">
          <UploadAvatar />
        </div>
        <div className={cn(s.inputContainer, "flex flex-col items-center")}>
          <label
            htmlFor="name"
            className="text-primary-600 text-lg leading-6 font-bold mb-2"
          >
            Tên
          </label>
          <Input id="name" name="name" placeholder="Nhập tên" className="text-center" />
        </div>

        <div
          className={cn(s.inputContainer, "flex flex-col items-center mt-6")}
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

        <div>
          <div
            className={cn(s.inputContainer, "flex flex-col items-center mt-6")}
          >
            <label
              htmlFor="name"
              className="text-primary-600 text-lg leading-6 font-bold mb-2"
            >
              Password
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
        <div>
          <div
            className={cn(s.inputContainer, "flex flex-col items-center mt-6")}
          >
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

        <button className="my-6 bg-accent-600 text-neutral body-3 font-bold px-5 py-3.5 w-full rounded-large">
          Lưu
        </button>
      </div>
    </div>
  );
}
