import React from 'react';
import Navbar from './components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './components/Search';

const CustomerHeader = () => {
  return (
    <div className="w-full bg-primary-100 px-8 py-6">
      <div className="container mx-auto flex justify-between">
        <section className="flex items-center justify-between gap-6">
          <Link href={'/home'} className="">
            <Image
              src="/images/logo.png"
              className="rounded-xl"
              alt="avatar"
              width={35}
              height={40}
            />
          </Link>
          <SearchBar />
        </section>
        <section className="flex">
          <Navbar />
        </section>
      </div>
    </div>
  );
};

export default CustomerHeader;
