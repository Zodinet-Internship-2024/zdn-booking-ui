import React from 'react';
import PopularItem from './PopularItem';
import Pagination from '@/components/pagination/Pagination';
import PopularFilter from './PopularFilter';

type PopularPlacesProps = {
  sportFields: SportField[];
};

const PopularPlaces = ({ sportFields }: PopularPlacesProps) => {
  const pagination = sportFields.slice(0, 5);
  return (
    <div className="container mx-auto flex flex-col justify-center py-16">
      <h4 className="py-5 font-bold">Địa điểm nổi bật</h4>
      <PopularFilter />
      <div className="mb-6 mt-8 flex flex-col gap-6">
        {pagination.map((sportField) => (
          <PopularItem key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default PopularPlaces;
