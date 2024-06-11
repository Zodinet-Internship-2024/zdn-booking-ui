import React from "react";

import { BiUser } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { Input } from "antd";
import SearchBar from "./components/Search";

const Header = () => {
  return (
    <div className="justify-between flex py-6 px-32 w-full h-20 bg-primary-100">
      <div className="flex justify-between items-center gap-6">
        <Link href={"/"} className="">
          <Image
            src="/images/logo.png"
            className="rounded-xl"
            alt="avatar"
            width={35}
            height={40}
          />
        </Link>
        <SearchBar />
      </div>
      <div className="flex">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
