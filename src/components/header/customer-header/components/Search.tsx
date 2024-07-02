"use client";
import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { ConfigProvider, Input, InputRef } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import styles from './search.module.scss';
import { cn } from '@/libs/utils';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const { Search } = Input;

const SearchBar: React.FC = () => {
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get('q') ?? '');

  const router = useRouter();
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    router.push(`/search?q=${value}`);
  };

  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== '/search') {
      setText('');
    }
  }, [pathname]);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#F4F1FF',
          colorPrimaryActive: '#967DDD',
          borderRadius: 40,
          controlHeight: 12,
          fontSize: 16,
          lineWidth: 0,
        },
        components: {
          Input: {
            inputFontSizeLG: 14,
            paddingBlockLG: 10,
            paddingInlineLG: 16,
            colorText: '#40423F',
            colorTextPlaceholder: '#939393',

            addonBg: '#ffffff',
          },
        },
      }}
    >
      <Search
        className={cn(styles.searchContainer, 'grid h-10 w-1/2 items-center')}
        placeholder="Tìm kiếm..."
        onSearch={onSearch}
        style={{ width: '300px' }}
        enterButton
        size="large"
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="search-bar"
        defaultValue={searchParams.get('q') ?? ''}
      />
    </ConfigProvider>
  );
};

export default SearchBar;
