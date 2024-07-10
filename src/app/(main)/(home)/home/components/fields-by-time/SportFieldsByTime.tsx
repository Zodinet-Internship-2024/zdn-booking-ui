'use client';
import Pagination from '@/components/pagination/Pagination';
import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';
import React, { use, useEffect, useState } from 'react';
import TimeFilter from './TimeFilter';
import { useRouter, useSearchParams } from 'next/navigation'; // Import NextRouter
import { getSportFieldByTime } from '@/libs/api/sport-field-server.api';

type SportFieldsByTimeProps = {
  sportFields: SportField[];
};

const SportFieldsByTime = () => {
  const [sportFields, setSportFields] = useState<SportField[]>([]);
  const [totalPage, setTotalPages] = useState(0);
  const [time, setTime] = useState<{ start: string; end: string }>({
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  }); // [start, end
  const totalPages = Math.ceil(sportFields.length / 4);
  const router = useRouter(); // Update the type of 'router' to NextRouter
  const searchParams = useSearchParams();
  const page = searchParams.get('time-page');
  const typeId = searchParams.get('time');
  const currentPage = Number(page) || 1; // Current page from query or default to 1

  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  // const paginatedSportFields = sportFields.slice(startIndex, endIndex);

  const fetchSportFieldsByTime = async (startTime: string, endTime: string) => {
    const { data, totalPage } = await getSportFieldByTime({
      startTime,
      endTime,
      page: currentPage,
      size: 4,
      typeId: typeId || 'all',
    });
    setSportFields(data);
    setTotalPages(totalPage);
  };
  const onsubmit = (data: any) => {
    const startISO = data.start
      ? data.start.toISOString()
      : new Date().toISOString();
    const endISO = data.end ? data.end.toISOString() : new Date().toISOString();
    setTime({
      start: new Date(startISO).toISOString(),
      end: new Date(endISO).toISOString(),
    });
    fetchSportFieldsByTime(startISO, endISO);
  };

  useEffect(() => {
    fetchSportFieldsByTime(time.start, time.end);
  }, [page, typeId]);
  return (
    <div
      className="container mx-auto flex flex-col justify-center px-8 py-16"
      id="time-sport-fields"
    >
      <h4 className="py-5 font-bold">Đặt chỗ theo giờ</h4>
      <TimeFilter onsubmit={onsubmit} />
      <div className="mb-6 mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sportFields.length > 0 ? (
          sportFields.map((sportField) => (
            <SportFieldInfoCard key={sportField.id} sportField={sportField} />
          ))
        ) : (
          <div className="font-bold">Không có dữ liệu</div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        scrollId="time-sport-fields"
        totalPages={totalPage}
        name="time-page"
      />
    </div>
  );
};

export default SportFieldsByTime;
