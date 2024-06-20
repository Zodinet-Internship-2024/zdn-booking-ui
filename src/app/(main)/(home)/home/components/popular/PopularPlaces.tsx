'use client';
import Pagination from '@/components/pagination/Pagination';
import PopularFilter from './PopularFilter';
import PopularItem from './PopularItem';
import { useRouter, useSearchParams } from 'next/navigation';

type PopularPlacesProps = {
  sportFields: SportField[];
};

const PopularPlaces = ({ sportFields }: PopularPlacesProps) => {
  const totalPages = Math.ceil(sportFields.length / 4);
  const router = useRouter(); // Update the type of 'router' to NextRouter
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const currentPage = Number(page) || 1; // Current page from query or default to 1

  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const paginatedSportFields = sportFields.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  return (
    <div className="container mx-auto flex flex-col justify-center px-8 py-16">
      <h4 className="py-5 font-bold">Địa điểm nổi bật</h4>
      <PopularFilter />
      <div className="mb-6 mt-8 flex flex-col gap-6 divide-y xl:divide-y-0">
        {paginatedSportFields.map((sportField) => (
          <PopularItem key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PopularPlaces;
