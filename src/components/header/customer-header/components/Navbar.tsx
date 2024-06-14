import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-fit gap-10 mx-auto body-3 font-medium py-4  ">
      <Link className="hover:text-natural-400 text-natural-700" href="#">
        Kênh chủ sân
      </Link>
      <Link className="hover:text-natural-400 text-natural-700" href="#">
        {"Thông báo (12)"}
      </Link>
      <Link className="hover:text-natural-400 text-natural-700" href="#">
        Đặt chỗ
      </Link>
      <Link className="hover:text-natural-400 text-natural-700" href="/profile">
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
