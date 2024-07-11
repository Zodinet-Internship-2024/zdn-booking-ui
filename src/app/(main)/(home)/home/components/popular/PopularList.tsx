'use client';
import useSearchSportFields from '@/hooks/useSearchSportFields';
import PopularItem from './PopularItem';
import { message, Skeleton } from 'antd';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';
import { useEffect, useMemo } from 'react';

const PopularList = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get('popular-page') ?? 1;
  const typeId = searchParams.get('popular') ?? 'all';
  const date = searchParams.get('date') ?? '';
  const startTime = searchParams.get('start') ?? '';
  const endTime = searchParams.get('end') ?? '';
  const distance = searchParams.get('distance') ?? '';
  const price = searchParams.get('price') ?? '';
  const size = 4;

  const query = useMemo(
    () => ({
      date,
      startTime,
      endTime,
      distanceOrder: distance,
      priceOrder: price,
    }),
    [date, startTime, endTime, distance, price],
  );
  const { sportFields, isLoading, totalPage } = useSearchSportFields({
    page: Number(page),
    typeId,
    size,
    query: JSON.stringify(query),
  });

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
          message.error(
            'Người dùng đã từ chối truy cập vị trí. \nVui lòng cấp quyền truy cập vị trí để sử dụng tính năng này.',
          );
        }
        result.onchange = () => {
          if (result.state === 'granted') {
            window.location.reload();
          } else if (result.state === 'denied') {
            message.error(
              'Người dùng đã từ chối truy cập vị trí. \nVui lòng cấp quyền truy cập vị trí để sử dụng tính năng này.',
            );
          }
        };
      });
    } else {
      message.error('Định vị không được hỗ trợ trên trình duyệt của bạn.');
    }
  }, []);

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
