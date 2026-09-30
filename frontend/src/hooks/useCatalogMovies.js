import { useEffect, useState } from 'react';
import { fetchMovies, fetchPopularMovies, discoverMovies } from '../api';

export default function useCatalogMovies({ query, page, year, minRating }) {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const timer = setTimeout(
      async () => {
        try {
          const data = await (query.trim()
            ? fetchMovies(query.trim(), page, controller.signal, year)
            : year || minRating > 0
              ? discoverMovies({ year, minRating }, page, controller.signal)
              : fetchPopularMovies(page, controller.signal));
          if (controller.signal.aborted) return;
          setMovies(data.results || []);
          setPages(Math.min(data.total_pages || 1, 500));
        } catch (err) {
          if (!controller.signal.aborted) {
            setError(err.message);
            setMovies([]);
          }
        } finally {
          if (!controller.signal.aborted) setLoading(false);
        }
      },
      query.trim() ? 300 : 0,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, page, retry, year, minRating]);

  const reload = () => setRetry((value) => value + 1);
  return { movies, pages, loading, error, reload };
}
