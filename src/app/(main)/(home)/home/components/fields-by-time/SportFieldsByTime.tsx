'use client';
import Pagination from '@/components/pagination/Pagination';
import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import React from 'react';
import TimeFilter from './TimeFilter';
import { useRouter, useSearchParams } from 'next/navigation'; // Import NextRouter

type SportFieldsByTimeProps = {
  sportFields: SportField[];
};

const SportFieldsByTime = ({ sportFields }: SportFieldsByTimeProps) => {
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
    <div className="container mx-auto flex flex-col justify-center py-16">
      <h4 className="py-5 font-bold">Đặt chỗ theo giờ</h4>
      <TimeFilter />
      <div className="mb-6 mt-8 grid grid-cols-4 gap-4">
        {paginatedSportFields.map((sportField) => (
          <SportFieldInfoCard key={sportField.id} sportField={sportField} />
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

export default SportFieldsByTime;
