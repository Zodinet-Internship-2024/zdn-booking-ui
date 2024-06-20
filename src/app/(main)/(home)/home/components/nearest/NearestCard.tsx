import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';

const NearestCard = () => {
    return (
      <section className="mx-auto flex h-card-md flex-col justify-between rounded-large bg-neutral p-6">
        <div className="space-y-5">
          <h4 className="font-bold">Gần bạn nhất</h4>

          <p className="body-4">
            Gồm những sân thể thao được đặt nhiều nhất khu vực của bạn trong
            tháng này.
          </p>
        </div>
        <Link
          href="#"
          className="flex w-fit items-center border-b-2 border-accent-600 text-accent-600"
        >
          <span className="body-3 font-bold">Xem tất cả</span>
          <ArrowRightOutlined className="font-bold" />
        </Link>
      </section>
    );
};
export default NearestCard;
