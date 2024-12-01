import { useEffect, useState, useCallback } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import { Input, Tabs, Spin, Alert, Pagination } from 'antd';
import { debounce } from 'lodash';
import { useMovieContext } from './context/MovieContext';
import useFetchMovies from './hooks/useFetchMovies';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=`;

  const {
    ratedMovies,
    loading: contextLoading,
    error: contextError,
  } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, totalPages, loading, error, fetchData } =
    useFetchMovies(baseUrl);

  // Дебаунс обработчик для поиска
  const debouncedFetchData = useCallback(
    debounce((query, page) => fetchData(query, page), 300),
    [fetchData],
  );

  // Обработка изменения строки поиска
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    debouncedFetchData(query, 1);
  };

  // Запуск поиска при изменении `searchQuery` или `currentPage`
  useEffect(() => {
    if (searchQuery) {
      fetchData(searchQuery, currentPage);
    }
  }, [currentPage, searchQuery, fetchData]);

  // Рендер сообщения о пустых результатах
  const renderNoResults = () => {
    if (searchQuery && !loading && movies.length === 0) {
      return <Alert message="No results found" type="info" />;
    }
    return null;
  };

  // Рендер ошибки
  const renderError = () => {
    const message = error || contextError;
    return message ? (
      <Alert message="Error" description={message} type="error" />
    ) : null;
  };

  // Конфигурация табов
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
          <MovieList movies={movies} />
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(page) => {
              setCurrentPage(page);
              debouncedFetchData(searchQuery, page);
            }}
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
      children: (
        <>
          {contextLoading && <Spin size="large" />}
          {renderError()}
          {ratedMovies.length === 0 && !contextLoading ? (
            <Alert message="No rated movies" type="info" />
          ) : (
            <MovieList movies={ratedMovies} />
          )}
        </>
      ),
    },
  ];

  return (
    <div className="app">
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
}

export default App;
