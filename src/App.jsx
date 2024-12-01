import { useState, useEffect, useRef } from 'react';
import './App.css';
import { MovieList, MyTabs, MyInput, MyPagination } from './components';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';
import { useMovieContext } from './context/MovieContext';
import { fetchMovies, fetchPopularMovies } from './service/index';

function App() {
  const {
    ratedMovies,
    loading: contextLoading,
    error: contextError,
  } = useMovieContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('search');

  // Дебаунсинг функции для поиска
  const debouncedFetchData = useRef(
    debounce(async (query, page) => {
      setLoading(true);
      try {
        const data = await fetchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (err) {
        setMovies([]);
        setTotalPages(1);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 300),
  ).current;

  // Функция для выполнения базового запроса популярных фильмов
  const fetchDefaultPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchPopularMovies();
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      setMovies([]);
      setTotalPages(1);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Выполняем базовый запрос для получения популярных фильмов при монтировании компонента
  useEffect(() => {
    fetchDefaultPopularMovies();
  }, []);

  // Обработка изменения строки поиска с задержкой
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value) {
      setCurrentPage(1);
      debouncedFetchData(value, 1);
    } else {
      setMovies([]);
      setTotalPages(1);
      fetchDefaultPopularMovies();
    }
  };

  // Обработка нажатия на Enter для запуска дебаунса
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      setCurrentPage(1);
      debouncedFetchData(searchQuery, 1);
    }
  };

  // Логика для изменения страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
    debouncedFetchData(searchQuery, page);
  };

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

  // Логика отображения контента в зависимости от активной вкладки
  const renderTabContent = () => {
    if (activeTab === 'search') {
      return (
        <div className="app-container">
          {loading && <Spin size="large" />}
          {renderError()}
          {renderNoResults()}
          {!loading && <MovieList movies={movies} />}
        </div>
      );
    }

    if (activeTab === 'rated') {
      return (
        <div className="app-container">
          {contextLoading && <Spin size="large" />}
          {renderError()}
          {ratedMovies.length === 0 && !contextLoading ? (
            <Alert message="No rated movies" type="info" />
          ) : (
            <MovieList movies={ratedMovies} />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="app">
      {/* Компонент для табов */}
      <MyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Инпут для поиска */}
      {activeTab === 'search' && (
        <MyInput
          placeholder="Type to search ..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      )}

      {/* Контент в зависимости от выбранной вкладки */}
      {renderTabContent()}

      {/* Пагинация */}
      {activeTab === 'search' && (
        <MyPagination
          currentPage={currentPage}
          totalPages={totalPages}
          loading={loading}
          setCurrentPage={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
