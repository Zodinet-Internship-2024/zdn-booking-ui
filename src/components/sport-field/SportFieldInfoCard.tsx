import { cn } from '@/libs/utils';
import { Button } from 'antd';
import Image from 'next/image';
import styles from './sport-field.module.scss';
import SportFieldShortInfo from './SportFieldShortInfo';

type SportFieldInfoCardProps = {
    sportField: SportField;
};

const SportFieldInfoCard = ({ sportField }: SportFieldInfoCardProps) => {
    return (
        <section
            className={cn(
                styles.sportFieldCardContainer,
                'size-card bg-primary-100 rounded-large p-6 flex flex-col justify-between'
            )}
        >
            <div>
                <p className="body-2 font-bold truncate mb-5">{sportField.name}</p>
                <SportFieldShortInfo sportField={sportField} />
            </div>
            <Button type="primary" className="mt-auto flex items-center gap-2">
                <Image src="/icons/external-link.svg" alt="location icon" width={20} height={20} />
                <span className="body-3 font-bold">Đặt chỗ ngay</span>
            </Button>
        </section>
    );
};
export default SportFieldInfoCard;
