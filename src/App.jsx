import { useEffect, useState } from 'react';
import './App.css';
import Catalog from './components/Catalog/Catalog';
import { Input, Tabs, Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=`;

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (query, page = 1) => {
    if (!query) {
      setMovies([]);
      setTotalPages(1);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}${page}&query=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((query) => {
    fetchData(query, 1);
  }, 300);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchData(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery]);

  const renderNoResults = () => {
    if (searchQuery && !loading && movies.length === 0) {
      return <Alert message="No results found" type="info" />;
    }
  };

  const renderError = () => {
    if (error) {
      return <Alert message="Error" description={error} type="error" />;
    }
  };

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <div className="app-container">
          <Input
            className="custom-input"
            placeholder="Type to search ..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {loading && <Spin size="large" />}
          {renderError()}
          {renderNoResults()}
          <Catalog movies={movies} />
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
            pageSize={6}
            showSizeChanger={false}
            hideOnSinglePage={true}
            disabled={loading}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: <div>Rated Content Coming Soon</div>,
    },
  ];

  return (
    <div className="app">
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
}

export default App;
