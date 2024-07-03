'use client';
import useSearchSportFields from '@/hooks/useSearchSportFields';
import PopularItem from './PopularItem';
import { Skeleton } from 'antd';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';

const PopularList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('popular-page') ?? 1;
  const typeId = searchParams.get('popular') ?? 'all';
  const size = 4;
  const { sportFields, isLoading, totalPage } = useSearchSportFields({
    page: Number(page),
    typeId,
    size,
  });

  if (isLoading) {
    return <PopularPlacesSkeleton />;
  }
  if (!sportFields) {
    return null;
  }
  return (
    <div>
      <div className="mb-6 mt-8 flex flex-col gap-6 divide-y xl:divide-y-0">
        {sportFields.map((sportField) => (
          <PopularItem key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination
        currentPage={+page}
        totalPages={totalPage}
        name="popular-page"
        scrollId="popular-places"
      />
    </div>
  );
};
export default PopularList;

export const PopularPlacesSkeleton = () => {
  return (
    <div className="container mx-auto mb-6 mt-8 flex flex-col gap-6 divide-y xl:divide-y-0">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton.Button
            key={index}
            style={{ width: '100%', height: '360px', borderRadius: '40px' }}
            active
          />
        ))}
      </div>
    </div>
  );
};
