import Image from 'next/image';
import Link from 'next/link';
import Navbar from './components/Navbar';

const OwnerHeader = () => {
  return (
    <div className="flex h-20 w-full justify-between bg-neutral px-32 py-6">
      <div className="flex items-center justify-between gap-6">
        <Link
          href={'/owner'}
          className="body-2 flex items-center gap-6 font-medium text-natural-400"
        >
          <Image
            src="/images/logo.png"
            className="rounded-xl"
            alt="avatar"
            width={35}
            height={40}
          />
          Nguyễn Phan Minh Triết
        </Link>
      </div>
      <div className="flex">
        <Navbar />
      </div>
    </div>
  );
};

export default OwnerHeader;
