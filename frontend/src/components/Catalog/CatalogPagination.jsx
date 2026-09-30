import MyPagination from '../Pagination/Pagination';
import { useCatalogContext } from '../../context/CatalogContext';

export default function CatalogPagination() {
  const { tab, error, page, pages, loading, changePage } = useCatalogContext();
  if (tab !== 'search' || error) return null;
  return (
    <MyPagination
      currentPage={page}
      totalPages={pages}
      loading={loading}
      setCurrentPage={changePage}
    />
  );
}
