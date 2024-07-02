import { cn, formatCurrency, formatDateToTime } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import dollar from '@public/icons/dollar.svg';
import bike from '@public/icons/bike.svg';

type SportFieldShortInfoProps = {
  sportField: SportField;
  className?: string;
};

const SportFieldShortInfo = ({
  sportField,
  className,
}: SportFieldShortInfoProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/location-icon.svg"
            alt="location icon"
            width={20}
            height={20}
          />
          <p className="body-4 truncate">
            {sportField.location?.addressDetail ?? 'Chưa cập nhật'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image src={bike} alt="Bike Icon" width={20} height={20} />

        <p className="body-4 truncate">{`2.7 km`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock-icon.svg"
          alt="location icon"
          width={20}
          height={20}
        />
        <p className="body-4 truncate">
          {/* {sportField.startTime} - {sportField.endTime} */}
          {new Date(sportField.startTime).toLocaleTimeString()}-
          {new Date(sportField.endTime).toLocaleTimeString()}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Image src={dollar} alt="Dollar Icon" width={20} height={20} />
        <p className="body-4 truncate">
          {formatCurrency(sportField.price)}/30 phút
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/phone-icon.svg"
          alt="location icon"
          width={20}
          height={20}
        />
        <Link
          href={`tel:${sportField.phone ?? ''}`}
          className="body-4 truncate text-alerts-blue underline"
        >
          {sportField.phone ?? 'Chưa cập nhật'}
        </Link>
      </div>
    </div>
  );
};
export default SportFieldShortInfo;
