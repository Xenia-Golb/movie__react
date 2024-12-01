/* eslint-disable react/prop-types */
import { Pagination } from 'antd';
import './Pagination.css';

function MyPagination({
  currentPage,
  totalPages,
  loading,
  setCurrentPage,
  searchQuery,
  debouncedFetchData,
}) {
  const handlePageChange = (page) => {
    setCurrentPage(page);
    debouncedFetchData(searchQuery, page);
  };

  return (
    <Pagination
      current={currentPage}
      total={totalPages * 10}
      onChange={handlePageChange}
      pageSize={10}
      showSizeChanger={false}
      hideOnSinglePage={true}
      disabled={loading}
    />
  );
}

export default MyPagination;
