'use client';
import { cn } from '@/libs/utils';
import { Button } from 'antd';
import Image from 'next/image';
import styles from './sport-field.module.scss';
import SportFieldShortInfo from './SportFieldShortInfo';
import { useRouter } from 'next/navigation';

type SportFieldInfoCardProps = {
  sportField: SportField;
};

const SportFieldInfoCard = ({ sportField }: SportFieldInfoCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/field-reservation/${sportField.id}`);
  };
  return (
    <section
      className={cn(
        styles.sportFieldCardContainer,
        'flex h-card flex-col justify-between rounded-large bg-primary-100 p-6',
      )}
    >
      <div>
        <p className="body-2 mb-5 truncate font-bold">{sportField.name}</p>
        <SportFieldShortInfo sportField={sportField} />
      </div>
      <Button
        type="primary"
        className="mt-auto flex items-center gap-2"
        onClick={handleClick}
      >
        <Image
          src="/icons/external-link.svg"
          alt="location icon"
          width={20}
          height={20}
        />
        <span className="body-3 font-bold">Đặt chỗ ngay</span>
      </Button>
    </section>
  );
};
export default SportFieldInfoCard;
