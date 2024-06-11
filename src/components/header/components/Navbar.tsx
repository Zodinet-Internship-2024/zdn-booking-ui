import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-fit gap-10 mx-auto body-3 font-medium py-4 text-neutral-700">
      <Link className="" href="#">
        Kênh chủ sân
      </Link>
      <Link className="" href="#">
        {"Thông báo (12)"}
      </Link>
      <Link className="" href="#">
        Đặt chỗ
      </Link>
      <Link className="" href="/profile">
        <Image
          src="/images/avt.png"
          className="rounded-xl"
          alt="avatar"
          width={44}
          height={44}
        />
      </Link>
    </div>
  );
};

export default Navbar;
