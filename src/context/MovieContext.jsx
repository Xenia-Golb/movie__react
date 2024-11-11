/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки жанров
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
          import.meta.env.VITE_API_KEY,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (err) {
      setError('Error fetching genres: ' + err.message);
    }
  };

  // Функция для создания гостевой сессии
  const createSession = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${import.meta.env.VITE_API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      const data = await response.json();
      setSessionId(data.guest_session_id);
    } catch (err) {
      setError('Error creating session: ' + err.message);
    }
  };

  useEffect(() => {
    fetchGenres();
    createSession();
  }, []);

  useEffect(() => {
    if (genres.length > 0 && sessionId) {
      setLoading(false);
    }
  }, [genres, sessionId]);

  return (
    <MovieContext.Provider
      value={{ genres, sessionId, ratedMovies, setRatedMovies, loading, error }}
    >
      {children}
    </MovieContext.Provider>
  );
};
