import React from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './components/Search';

const OwnerHeader = () => {
  return (
    <div className="justify-between flex py-6 px-32 w-full h-20 bg-primary-100">
      <div className="flex justify-between items-center gap-6">
        <Link
          href={'/'}
          className="flex items-center gap-6 body-2 font-medium text-natural-400"
        >
          <Image
            src="/images/logo.png"
            className="rounded-xl"
            alt="avatar"
            width={35}
            height={40}
          />
          Nguyễn Phan Minh Triết
        </Link>
      </div>
      <div className="flex">
        <Navbar />
      </div>
    </div>
  );
};

export default OwnerHeader;
