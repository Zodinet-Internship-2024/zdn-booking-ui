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
  const type = searchParams.get('type') ?? 'all';
  const q = searchParams.get('q') ?? '';
  const size = 6;
  const query = {
    name: q,
  };
  const { sportFields, isLoading, totalPage } = useSearchSportFields({
    page: +page,
    size,
    query: JSON.stringify(query),
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
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
    <div className="container mx-auto grid grid-cols-1 gap-4 xl:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Skeleton.Button
          key={index}
          style={{ width: '736px', height: '312px', borderRadius: '40px' }}
        />
      ))}
    </div>
  );
};
