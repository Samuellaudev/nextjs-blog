import Link from 'next/link';
import PaginationLink from './PaginationLink';
import styles from './pagination.module.css';

type PageType = 'Latest Posts' | 'Dashboard';
type FieldMap = 'blog' | 'dashboard';

interface PaginationProps {
  page: number;
  pages: number;
  search: string;
  pageType: PageType
}

const Paginate = ({ pages, page, pageType, search = '' }: PaginationProps) => {
  const fieldMap: Record<PageType, string> = {
    'Latest Posts': 'blog',
    'Dashboard': 'dashboard',
  };

  const pageField = fieldMap[pageType as PageType] as FieldMap

  if (pages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    return [...Array(pages).keys()].map((pageNumber) => {
      const currentPage = pageNumber + 1;
      const isCurrentPage = currentPage === page;

      return (
        <Link
          key={ currentPage }
          href={ `/${ fieldMap[pageType] }?search=${ search }&pageNumber=${ currentPage }` }
        >
          <span
            className={ `${ styles.page_number
              } dark:bg-gray-800 dark:text-white ${ isCurrentPage
                ? 'text-white bg-primary-400 dark:bg-primary-400'
                : ''
              }` }
          >
            { currentPage }
          </span>
        </Link>
      );
    });
  };

  return (
  <>
    { (pageType === 'Latest Posts' || pageType === 'Dashboard') ? (
        <div className="flex items-center mt-8 mb-16 justify-center">
        <PaginationLink
          arrowType="left"
          page={ page }
          pages={ pages }
          search={ search }
          pageType={ pageField }
        />
          { renderPageNumbers() }
      <PaginationLink
        arrowType="right"
        page={ page }
        pages={ pages }
        search={ search }
        pageType={ pageField }
      />
      </div>
      ) : null }
      </>
  );
};

export default Paginate;
