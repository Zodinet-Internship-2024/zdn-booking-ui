'use client';
import useSearchSportFields from '@/hooks/useSearchSportFields';
import NearestCard from './NearestCard';
import NearestImage from './NearestImage';

const NearestFields = () => {
  const query = {
    distanceOrder: 'ASC',
  };
  const { sportFields } = useSearchSportFields({
    page: 1,
    size: 7,
    query: JSON.stringify(query),
  });

  return (
    <div className="bg-primary-100 px-8">
      <div className="container mx-auto grid grid-cols-1 place-content-center justify-center gap-4 py-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NearestCard />
        {sportFields?.map((sportField) => (
          <NearestImage key={sportField.id} sportField={sportField} />
        ))}
      </div>
    </div>
  );
};
export default NearestFields;
