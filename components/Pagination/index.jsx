import Link from 'next/link';
import PaginationLink from './PaginationLink';
import styles from './pagination.module.css';

const Paginate = ({ pages, page, pageType, search = '' }) => {
  const fieldMap = {
    'Latest Posts': 'blog',
    Dashboard: 'dashboard',
  };

  if (pages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    return [...Array(pages).keys()].map((pageNumber) => {
      const currentPage = pageNumber + 1;
      const isCurrentPage = currentPage === page;

      return (
        <Link
          key={currentPage}
          href={`/${fieldMap[pageType]}?search=${search}&pageNumber=${currentPage}`}
        >
          <span
            className={`${
              styles.page_number
            } dark:bg-gray-800 dark:text-white ${
              isCurrentPage
                ? 'text-white bg-primary-400 dark:bg-primary-400'
                : ''
            }`}
          >
            {currentPage}
          </span>
        </Link>
      );
    });
  };

  return (
    <div className="flex items-center mt-8 mb-16 justify-center">
      <PaginationLink
        arrowType="left"
        page={page}
        pages={pages}
        search={search}
        pageType={fieldMap[pageType]}
      />
      {renderPageNumbers()}
      <PaginationLink
        arrowType="right"
        page={page}
        pages={pages}
        search={search}
        pageType={fieldMap[pageType]}
      />
    </div>
  );
};

export default Paginate;
