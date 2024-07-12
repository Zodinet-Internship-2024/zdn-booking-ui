import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import styles from './banner.module.scss';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { getSportFields } from '@/libs/api/sport-field.api';
// import { getSportFields } from '@/libs/api/sport-field-server.api';

const Banner = async () => {
  const sportFieldRes = await getSportFields({ size: 1 });

  if (!sportFieldRes) {
    return null;
  }

  const sportField: SportField = sportFieldRes.data?.[0];

  if (!sportField) {
    return null;
  }

  return (
    <div className={cn(styles.bannerContainer, 'bg-primary-100 px-8 py-12')}>
      <div className="container mx-auto grid grid-cols-1 items-center justify-between gap-12 lg:grid-cols-2 xl:gap-36">
        <div className="flex flex-col gap-4 lg:gap-10">
          <h1 className="font-bold text-primary-600">
            Đặt sân tập ngay hôm nay!
          </h1>
          <p className="body-2 font-medium text-neutral-700">
            Đặt sân tập ngay hôm nay để nâng cao kỹ năng và thể lực. Chúng tôi
            cung cấp các sân tập hiện đại, đảm bảo an toàn và thoải mái cho bạn.
            Hãy đăng ký ngay để trải nghiệm những giây phút sôi động trên sân!
          </p>
          <Link href={`/field-reservation/${sportField?.id}`}>
            <Button
              className="text-h mt-2 flex items-center justify-center gap-3 lg:mt-4"
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
          </Link>
        </div>
        <Link
          href={`/field-reservation/${sportField?.id}`}
          className="relative block h-60 w-full overflow-hidden rounded-large transition-all duration-500 ease-in-out hover:scale-[101%] hover:shadow-lg sm:h-96 lg:h-full"
        >
          <Image
            src={sportField.sportFieldImages?.[0]?.url}
            fill
            alt={'Banner Photo'}
          />
        </Link>{' '}
      </div>
    </div>
  );
};

export default Banner;
