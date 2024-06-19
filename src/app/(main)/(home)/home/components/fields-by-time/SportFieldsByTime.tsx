import Pagination from '@/components/pagination/Pagination';
import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import React from 'react';
import TimeFilter from './TimeFilter';

type SportFieldsByTimeProps = {
  sportFields: SportField[];
};

const SportFieldsByTime = ({ sportFields }: SportFieldsByTimeProps) => {
  const pagination = sportFields.slice(0, 4);
  return (
    <div className="container mx-auto flex flex-col justify-center px-8 py-16">
      <h4 className="py-5 font-bold">Đặt chỗ theo giờ</h4>
      <TimeFilter />
      <div className="mb-6 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pagination.map((sportField) => (
          <SportFieldInfoCard key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default SportFieldsByTime;
