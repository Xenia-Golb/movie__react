import { useState, useCallback } from 'react';

const useFetchMovies = (baseUrl) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (query, page = 1) => {
      // Проверка на наличие запроса
      if (!query) {
        setMovies([]);
        setTotalPages(1);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}${page}&query=${encodeURIComponent(query)}`,
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.status_message || 'Failed to fetch movies');
        }
        const data = await response.json();

        // Проверка, что данные получены и результаты есть
        if (data && data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } else {
          throw new Error('No results found');
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [baseUrl],
  );

  return {
    movies,
    totalPages,
    loading,
    error,
    fetchData,
  };
};

export default useFetchMovies;
