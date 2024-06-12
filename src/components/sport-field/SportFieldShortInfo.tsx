import { formatDateToTime } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';
import { RiEBike2Line } from 'react-icons/ri';

type SportFieldShortInfoProps = {
    sportField: SportField;
};

const SportFieldShortInfo = ({ sportField }: SportFieldShortInfoProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                    <Image
                        src="/icons/location-icon.svg"
                        alt="location icon"
                        width={20}
                        height={20}
                    />
                    <p className="truncate body-4">{sportField.location.addressDetail}</p>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <RiEBike2Line className="text-primary-600 size-5" />

                <p className="truncate body-4">2.7 km</p>
            </div>
            <div className="flex gap-2 items-center">
                <Image src="/icons/clock-icon.svg" alt="location icon" width={20} height={20} />
                <p className="truncate body-4">
                    {formatDateToTime(sportField.startTime)} -{' '}
                    {formatDateToTime(sportField.endTime)}
                </p>
            </div>
            <div className="flex gap-2 items-center">
                <PiCurrencyDollarSimpleBold className="text-primary-600 size-5" />
                <p className="truncate body-4">{sportField.price} đ/30 phút</p>
            </div>
            <div className="flex gap-2 items-center">
                <Image src="/icons/phone-icon.svg" alt="location icon" width={20} height={20} />
                <Link href={`tel:${sportField.phone}`} className="truncate body-4">
                    {sportField.phone}
                </Link>
            </div>
        </div>
    );
};
export default SportFieldShortInfo;
