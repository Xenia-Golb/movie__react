import { createContext, useContext, useState, useEffect } from 'react';
import { fetchGenres, createSession, rateMovie } from '../service/movieService';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

// eslint-disable-next-line react/prop-types
export const MovieProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  const initialize = async () => {
    setStatus({ loading: true, error: null });
    try {
      const [fetchedGenres, newSessionId] = await Promise.all([
        fetchGenres(),
        createSession(),
      ]);
      setGenres(fetchedGenres);
      setSessionId(newSessionId);
      setStatus({ loading: false, error: null });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  const handleRateMovie = async (movie, ratingValue) => {
    if (!sessionId) return;

    try {
      await rateMovie(movie, ratingValue, sessionId);

      setRatedMovies((prevRatedMovies) => {
        const movieIndex = prevRatedMovies.findIndex((m) => m.id === movie.id);

        if (movieIndex !== -1) {
          const updatedMovies = [...prevRatedMovies];
          updatedMovies[movieIndex] = {
            ...updatedMovies[movieIndex],
            rating: ratingValue,
          };
          return updatedMovies;
        } else {
          return [...prevRatedMovies, { ...movie, rating: ratingValue }];
        }
      });
    } catch (error) {
      console.error('Error rating movie:', error.message);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        genres,
        sessionId,
        ratedMovies,
        rateMovie: handleRateMovie,
        ...status,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
