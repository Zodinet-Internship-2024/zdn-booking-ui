import { usePathname, useRouter } from 'next/navigation';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void; // Add onPageChange prop here
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleArrowRight = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage); // Call onPageChange prop to update page
      router.push(`${pathname}?page=${nextPage}`, { scroll: false });
    }
  };

  const handleArrowLeft = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      onPageChange(prevPage); // Call onPageChange prop to update page
      router.push(`${pathname}?page=${prevPage}`, { scroll: false });
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
