import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import useCatalogMovies from './useCatalogMovies';
import useMovieSync from './useMovieSync';

export default function useCatalog() {
  const {
    genres,
    ratedMovies,
    watchedMovies,
    watchedError,
    error: ratingError,
  } = useMovieContext();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('search');
  const [genre, setGenre] = useState('Все жанры');
  const [year, setYear] = useState('');
  const [minRating, setMinRating] = useState(0);
  const hasFilters = genre !== 'Все жанры' || !!year || minRating > 0;
  const resetFilters = () => {
    setYear('');
    setMinRating(0);
    setGenre('Все жанры');
    setPage(1);
  };

  const { movies, pages, loading, error, reload } = useCatalogMovies({
    query,
    page,
    year,
    minRating,
  });
  const { syncing, syncNotice, handleSync } = useMovieSync(reload);
  const source =
    tab === 'rated' ? ratedMovies : tab === 'watched' ? watchedMovies : movies;
  const visible = source.filter((movie) => {
    const matchesGenre =
      genre === 'Все жанры' ||
      movie.genre_ids?.includes(genres.find((item) => item.name === genre)?.id);
    const matchesYear = !year || movie.release_date?.slice(0, 4) === year;
    const matchesRating =
      !minRating ||
      (Number.isFinite(movie.vote_average) && movie.vote_average >= minRating);
    return matchesGenre && matchesYear && matchesRating;
  });
  const availableGenres = genres
    .filter((item) =>
      source.some((movie) => movie.genre_ids?.includes(item.id)),
    )
    .slice(0, 6);
  const changeTab = (value) => {
    setTab(value);
    resetFilters();
  };

  const changeQuery = (value) => {
    setQuery(value);
    setPage(1);
    setGenre('Все жанры');
  };
  const changeYear = (value) => {
    setYear(value);
    setPage(1);
    setGenre('Все жанры');
  };
  const changeMinRating = (value) => {
    setMinRating(value);
    setPage(1);
    setGenre('Все жанры');
  };
  const changePage = (value) => {
    setPage(value);
    setGenre('Все жанры');
    document
      .getElementById('catalog-title')
      ?.scrollIntoView({ behavior: 'smooth' });
  };
  const resetCatalog = () => {
    if (hasFilters) {
      resetFilters();
      return;
    }
    changeTab('search');
    setQuery('');
    setPage(1);
  };

  return {
    query,
    changeQuery,
    page,
    changePage,
    tab,
    genre,
    setGenre,
    year,
    changeYear,
    minRating,
    changeMinRating,
    hasFilters,
    resetFilters,
    resetCatalog,
    visible,
    availableGenres,
    changeTab,
    ratedMovies,
    watchedMovies,
    watchedError,
    ratingError,
    pages,
    loading,
    error,
    reload,
    syncing,
    syncNotice,
    handleSync,
  };
}
