import { DEFAULT_IMAGES } from '@/constants/constant';
import Image from 'next/image';
import Link from 'next/link';

type NearestImageProps = {
  sportField: SportField;
};
const NearestImage = ({ sportField }: NearestImageProps) => {
  const img = sportField.sportFieldImages?.[0]?.url ?? DEFAULT_IMAGES[0];
  return (
    <Link
      href={`/field-reservation/${sportField.id}`}
      className="group relative mx-auto block h-card-md w-full cursor-pointer overflow-hidden rounded-large"
    >
      <Image src={img} alt={sportField.name} fill />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center bg-primary-600/55 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="rounded-full bg-white p-4">
          <Image
            src="/icons/external-link-primary.svg"
            alt="location icon"
            width={20}
            height={20}
          />
        </div>
        <p
          title={sportField.location?.addressDetail ?? 'Đang cập nhật'}
          className="body-4 absolute bottom-6 w-[85%] truncate rounded-large bg-white px-3 py-2 text-center font-medium text-primary-600"
        >
          {sportField.location?.addressDetail ?? 'Đang cập nhật'}
        </p>
      </div>
    </Link>
  );
};
export default NearestImage;
