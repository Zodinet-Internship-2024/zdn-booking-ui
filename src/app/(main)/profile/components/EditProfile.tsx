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
        'flex w-full flex-col gap-5 rounded-large border-2 border-primary-400 bg-primary-100 p-10',
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <FaArrowLeft className="mr-4 text-xl" />
        </button>

        <span className="cursor-pointer text-[28px] font-bold leading-7">
          Chỉnh sửa thông tin
        </span>
      </div>

      <div className="mt-10 flex flex-col">
        <div className="mb-10 h-[84px] w-[84px] self-center">
          <UploadAvatar />
        </div>
        <div className={cn(s.inputContainer, 'flex flex-col items-center')}>
          <label
            htmlFor="name"
            className="mb-2 text-lg font-bold leading-6 text-primary-600"
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
          className={cn(s.inputContainer, 'mt-6 flex flex-col items-center')}
        >
          <label
            htmlFor="phone"
            className="mb-2 text-lg font-bold leading-6 text-primary-600"
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
