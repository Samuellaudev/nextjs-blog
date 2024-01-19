import Link from 'next/link';
import styles from './pagination.module.css';

const PaginationLink = ({ arrowType, page, pages, pageType, search = '' }) => {
  return (
    <>
      {arrowType === 'left' && (
        <Link
          href={`/${pageType}?search=${search}&pageNumber=${page - 1 || 1}`}
          disabled={page - 1 === 0}
          className={`${styles.normal_arrow} dark:bg-gray-800
          ${
            page - 1 === 0
              ? 'cursor-not-allowed dark:text-gray-600'
              : styles.more_pages
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
      {arrowType === 'right' && (
        <Link
          href={`/${pageType}?search=${search}&pageNumber=${page + 1 || pages}`}
          disabled={pages - page === 0}
          className={`${styles.normal_arrow}  dark:bg-gray-800
          ${
            pages - page === 0
              ? 'cursor-not-allowed dark:text-gray-600'
              : styles.more_pages
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </>
  );
};

export default PaginationLink;
