'use client';
import { useSearchParams } from 'next/navigation';
import SearchCard from './SearchCard';
import useSearchSportFields from '@/hooks/useSearchSportFields';
import { Skeleton } from 'antd';
import Pagination from '@/components/pagination/Pagination';

type SearchListProps = {
  sportFields: SportField[];
};
const SearchList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const size = searchParams.get('size') ?? '6';
  const type = searchParams.get('type') ?? 'all';
  const q = searchParams.get('q') ?? '';
  const { sportFields, isLoading, totalPage } = useSearchSportFields({
    page: +page,
    size: +size,
    query: q,
    typeId: type,
  });

  if (isLoading) {
    return <SearchListSkeleton />;
  }

  if (!sportFields) {
    return null;
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {sportFields.map((sportField) => (
          <SearchCard key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={+page}
          totalPages={totalPage}
          scrollId="search-result"
        />
      </div>
    </div>
  );
};
export default SearchList;

export const SearchListSkeleton = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton.Button
          style={{ width: '736px', height: '312px', borderRadius: '40px' }}
        />
      ))}
    </div>
  );
};
