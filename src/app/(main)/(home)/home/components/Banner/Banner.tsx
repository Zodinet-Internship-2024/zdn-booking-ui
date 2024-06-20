'use client';
import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import styles from './banner.module.scss';
import { cn } from '@/libs/utils';
import { useRouter } from 'next/navigation';

const Banner = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/field-reservation/123`);
  };
  return (
    <div
      className={cn(
        styles.bannerContainer,
        'h-[520px] bg-primary-100 px-8 py-12',
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-36">
        <div className="flex w-[738px] flex-col gap-10">
          <h1 className="font-bold text-primary-600">
            Đặt sân tập ngay hôm nay!
          </h1>
          <p className="body-2 font-medium text-neutral-700">
            Đặt sân tập ngay hôm nay để nâng cao kỹ năng và thể lực. Chúng tôi
            cung cấp các sân tập hiện đại, đảm bảo an toàn và thoải mái cho bạn.
            Hãy đăng ký ngay để trải nghiệm những giây phút sôi động trên sân!
          </p>
          <Button
            onClick={handleClick}
            className="text-h mt-4 flex items-center gap-3"
            type="primary"
          >
            Đặt sân ngay
            <Image
              src="/icons/arrow-right-icon.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </Button>
        </div>
        <div className="relative h-[424px] w-[612px] overflow-hidden rounded-large">
          <Image
            src="https://picsum.photos/612/425"
            fill
            alt={'Banner Photo'}
          />
        </div>{' '}
      </div>
    </div>
  );
};

export default Banner;
