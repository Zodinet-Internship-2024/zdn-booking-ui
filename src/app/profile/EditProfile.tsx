import Image from "next/image";
import UploadAvatar from "./UploadAvatar";
import { Input } from "antd";

export default function EditProfile() {
  return (
    <div className="bg-primary-100 rounded-large flex flex-col gap-5 p-10 w-1/2">
      <h3 className="font-bold">Edit profile</h3>

      <div className="flex flex-col gap-y-6">
        <div className="w-[84px] h-[84px] self-center m-5">
          <UploadAvatar />
        </div>
        <div>
          <p className="body-2 text-primary-600 font-bold text-center">Tên</p>
          <Input placeholder="Nhập tên" />
        </div>
        <div>
          <p className="body-2 text-primary-600 font-bold text-center">Phone</p>
          <Input placeholder="Nhập số điện thoại" />
        </div>
        <div>
          <p className="body-2 text-primary-600 font-bold text-center">Address</p>
          <Input placeholder="Nhập địa chỉ" />
        </div>
        <button className="bg-accent-600 text-neutral body-3 font-bold px-5 py-3.5 w-full rounded-large">
          Lưu
        </button>
      </div>
    </div>
  );
}
