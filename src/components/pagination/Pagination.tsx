import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  scrollId?: string;
  name?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  scrollId,
  name = 'page',
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollToId = scrollId ? `#${scrollId}` : '';

  if (isNaN(currentPage) || isNaN(totalPages)) {
    currentPage = 1;
    totalPages = 1;
  }

  const handleArrowRight = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set(name, nextPage.toString());
      router.push(`${pathname}?${params.toString()}${scrollToId}` as any);
    }
  };

  const handleArrowLeft = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      const params = new URLSearchParams(searchParams);
      params.set(name, prevPage.toString());
      router.push(`${pathname}?${params.toString()}${scrollToId}` as any);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex h-[52px] w-[52px] items-center justify-start">
        <FaArrowLeft
          onClick={handleArrowLeft}
          className={`cursor-pointer text-2xl ${currentPage === 1 ? 'text-neutral-200' : 'text-primary-500'}`}
        />
      </div>
      <div className="flex items-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`mr-3 h-2.5 w-2.5 rounded-full ${currentPage === index + 1 ? 'bg-primary-500' : 'bg-neutral-200'}`}
          ></span>
        ))}
      </div>
      <div className="flex h-[52px] w-[52px] items-center justify-end">
        <FaArrowRight
          onClick={handleArrowRight}
          className={`cursor-pointer text-2xl ${currentPage === totalPages ? 'text-neutral-200' : 'text-primary-500'}`}
        />
      </div>
    </div>
  );
};

export default Pagination;
