'use client';
import AccentButton from '@/components/common/components/AccentButton';
import { useRouter, useSearchParams } from 'next/navigation';

const NotificationFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const read = searchParams.get('read') ?? 'all';

  const handleClick = (read: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('read', read);
    router.push(`?${params.toString()}` as any);
  };
  return (
    <div className="flex gap-2">
      <AccentButton
        isActive={read === 'all'}
        onClick={() => handleClick('all')}
        label="Tất cả"
        value="all"
      />
      <AccentButton
        isActive={read === 'false'}
        onClick={() => handleClick('false')}
        label="Chưa đọc"
        value="false"
      />
    </div>
  );
};
export default NotificationFilter;
