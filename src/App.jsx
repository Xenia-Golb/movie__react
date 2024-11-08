import { useEffect, useState } from 'react';
import './App.css';
import Catalog from './components/Catalog/Catalog';
import { Input, Tabs, Spin, Alert, Pagination } from 'antd';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=`;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}${page}`);
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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const tabItems = [
    {
      key: '1',
      label: 'Search',
      children: (
        <div className="app-container">
          <Input className="custom-input" placeholder="Type to search ..." />
          <Catalog movies={movies} />
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
            pageSize={6}
            showSizeChanger={false}
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
      {loading && movies.length === 0 ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              style={{ marginTop: 300 }}
              onClose={() => setError(null)}
            />
          )}

          {!loading && !error && (
            <Tabs defaultActiveKey="1" centered items={tabItems} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
