'use client';
import { cn } from '@/libs/utils';
import { Button } from 'antd';
import Image from 'next/image';
import styles from './sport-field.module.scss';
import SportFieldShortInfo from './SportFieldShortInfo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type SportFieldInfoCardProps = {
  sportField: SportField;
  className?: string;
};

const SportFieldInfoCard = ({
  sportField,
  className,
}: SportFieldInfoCardProps) => {
  const router = useRouter();
  return (
    <section
      className={cn(
        styles.sportFieldCardContainer,
        'flex h-card flex-col justify-between rounded-large bg-primary-100 p-6',
        className,
      )}
    >
      <div>
        <p className="body-2 mb-5 truncate font-bold">{sportField.name}</p>
        <SportFieldShortInfo sportField={sportField} />
      </div>
      <Link href={`/field-reservation/${sportField.id}`}>
        <Button type="primary" className="mt-auto flex items-center gap-2">
          <Image
            src="/icons/external-link.svg"
            alt="location icon"
            width={20}
            height={20}
          />
          <span className="body-3 font-bold">Đặt chỗ ngay</span>
        </Button>
      </Link>
    </section>
  );
};
export default SportFieldInfoCard;
