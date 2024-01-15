'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import styles from './searchBoxStyles.module.css';

const SearchBox = ({ isMobile = false }) => {
  const searchParams = useSearchParams();
  const urlKeyword = searchParams.get('search');
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const router = useRouter();

  const handleOnChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword) {
      router.push(`/blog?search=${keyword.trim()}`);
      setKeyword('');
    } else {
      router.push('/blog?search');
    }
  };
  return (
    <>
      {isMobile ? (
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            name="keyword"
            onChange={handleOnChange}
            value={keyword}
            className={`${styles.search_mobile} md:hidden`}
          />
          <IoIosSearch
            className={`absolute top-1.5 left-2 text-white ${
              keyword ? 'hidden' : ''
            }`}
          />
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            name="keyword"
            onChange={handleOnChange}
            value={keyword}
            className={`${styles.search_desktop} hidden md:block`}
          />
          <IoIosSearch
            className={`absolute top-1.5 left-2 text-gray-400 ${
              keyword ? 'hidden' : ''
            }`}
          />
        </form>
      )}
    </>
  );
};

export default SearchBox;
