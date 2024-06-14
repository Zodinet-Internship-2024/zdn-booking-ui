import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const links = [
  { href: '#', label: 'Kênh người bán' },
  { href: '#', label: 'Quản lý sân' },
  { href: '#', label: 'Tạo sân' },
  { href: '#', label: 'Lịch sử giao dịch' },
  { href: '#', label: 'Đặt chỗ (12)' },
];

const NavbarLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="hover:text-primary-600 hover:font-bold text-natural-700 py-2.5 px-5"
  >
    {label}
  </Link>
);

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-fit gap-5 mx-auto body-3 font-medium py-4">
      {links.map((link, index) => (
        <NavbarLink key={index} {...link} />
      ))}
      <Link
        href="/profile"
        className="hover:text-primary-600 hover:opacity-70 text-natural-700"
      >
        <Image
          src="/images/avt.png"
          alt="avatar"
          className="rounded-xl"
          width={44}
          height={44}
          priority
        />
      </Link>
    </div>
  );
};

export default Navbar;
