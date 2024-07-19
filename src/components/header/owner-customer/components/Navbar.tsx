'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/libs/utils';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const links = [
  { href: '/home', label: 'Kênh người thuê', hidden: true },
  { href: '/owner', label: 'Quản lý sân' },
  { href: '/create-sport-field', label: 'Tạo sân' },
  { href: '/transaction', label: 'Lịch sử giao dịch' },
  { href: '/booking', label: 'Đặt chỗ' },
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
      'truncate px-2 py-2.5 text-natural-700 hover:font-bold hover:text-primary-600 xl:px-5',
      isActive && 'font-bold text-primary-600',
      hidden && 'hidden xl:block',
    )}
  >
    {label}
  </Link>
);

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="body-3 mx-auto flex w-fit items-center justify-between py-4 font-medium md:gap-3 lg:gap-4 xl:gap-5">
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
          src={session?.user?.imageUrl || '/images/avatar.png'}
          alt="avatar"
          className="rounded-full"
          width={44}
          height={44}
          priority
        />
      </Link>
    </div>
  );
};

export default Navbar;
