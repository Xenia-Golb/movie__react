import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('API ключ не задан');

  // Получаем жанры с API
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
      );
      if (!response.ok)
        throw new Error(
          (await response.json()).status_message ||
            'Ошибка при получении жанров',
        );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      setStatus({
        loading: false,
        error: `Ошибка при получении жанров: ${error.message}`,
      });
    }
  };

  // Создаем сессию гостя для API
  const createSession = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
      );
      if (!response.ok)
        throw new Error(
          (await response.json()).status_message ||
            'Ошибка при создании сессии',
        );
      const data = await response.json();
      setSessionId(data.guest_session_id);
    } catch (error) {
      setStatus({
        loading: false,
        error: `Ошибка при создании сессии: ${error.message}`,
      });
    }
  };

  // Универсальная функция для добавления или обновления рейтинга фильма
  const rateMovie = async (movie, ratingValue) => {
    if (!sessionId) {
      console.error('Session ID is required');
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${apiKey}&guest_session_id=${sessionId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: ratingValue }),
        },
      );

      if (response.ok) {
        setRatedMovies((prevRatedMovies) => {
          // Проверка, если фильм уже есть, обновляем его рейтинг
          const updatedMovies = prevRatedMovies.map((m) =>
            m.id === movie.id ? { ...m, rating: ratingValue } : m,
          );
          // Если фильм еще не оценен, добавляем его
          const exists = prevRatedMovies.some((m) => m.id === movie.id);
          return exists
            ? updatedMovies
            : [...prevRatedMovies, { ...movie, rating: ratingValue }];
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to rate movie:', errorData.status_message);
      }
    } catch (error) {
      console.error('Error rating movie:', error.message);
    }
  };

  // Инициализация данных
  useEffect(() => {
    const initialize = async () => {
      setStatus({ loading: true, error: null });
      await Promise.all([fetchGenres(), createSession()]);
      setStatus((prevStatus) => ({ ...prevStatus, loading: false }));
    };
    initialize();
  }, []);

  return (
    <MovieContext.Provider
      value={{ genres, sessionId, ratedMovies, rateMovie, ...status }}
    >
      {children}
    </MovieContext.Provider>
  );
};
