import Image from "next/image";
import UploadAvatar from "./UploadAvatar";
import { Button, Input } from "antd";
import { cn } from "@/libs/utils";
import s from "./profile.module.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";

type EditProfileProps = {
  onCancel: () => void;
};

export default function EditProfile({ onCancel }: EditProfileProps) {
  return (
    <div
      className={cn(
        s.editProfileContainer,
        "bg-primary-100 rounded-large flex flex-col gap-5 p-10 w-full"
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <FaArrowLeft className="text-xl mr-4" />
        </button>

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
          <Input
            id="name"
            name="name"
            placeholder="Nhập tên"
            className="text-center"
          />
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

        <Button type="primary" className="mt-12">
          Lưu
        </Button>
      </div>
    </div>
  );
}
