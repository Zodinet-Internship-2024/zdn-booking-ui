import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';

const NearestCard = () => {
    return (
        <section className="bg-neutral w-card h-card-md flex flex-col justify-between p-6 rounded-large mx-auto">
            <div className="space-y-5">
                <h4 className="font-bold">Gần bạn nhất</h4>

                <p className="body-4">
                    Gồm những sân thể thao được đặt nhiều nhất khu vực của bạn trong tháng này.
                </p>
            </div>
            <Link
                href="#"
                className="text-accent-600 flex items-center border-b-2 border-accent-600 w-fit"
            >
                <span className="body-3 font-bold ">Xem tất cả</span>
                <HiArrowNarrowRight className="font-bold" />
            </Link>
        </section>
    );
};
export default NearestCard;
