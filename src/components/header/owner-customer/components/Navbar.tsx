'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';

const links = [
  // { href: '/home', label: 'Kênh người bán', hidden: true },
  { href: '/owner', label: 'Quản lý sân' },
  { href: '/create-sport-field', label: 'Tạo sân' },
  { href: '/transaction', label: 'Lịch sử giao dịch' },
  { href: '/booking', label: 'Đặt chỗ (12)' },
];

const NavbarLink = ({
  href,
  label,
  hidden = false,
  isActive = false,
}: {
  href: any;
  label: string;
  hidden?: boolean;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      'truncate px-5 py-2.5 text-natural-700 hover:font-bold hover:text-primary-600',
      isActive && 'font-bold text-primary-600',
      hidden && 'hidden xl:block',
    )}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="body-3 mx-auto flex w-fit items-center justify-between gap-5 py-4 font-medium">
      {links.map((link, index) => (
        <NavbarLink key={index} {...link} isActive={pathname === link.href} />
      ))}
      <Link
        href="/profile"
        className={cn(
          'text-natural-700 hover:text-primary-600 hover:opacity-70',
        )}
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
