import { useEffect, useState, useRef } from 'react';

export default function useMovieNavigation() {
  const [movieId, setMovieId] = useState(
    () => window.location.hash.match(/^#movie\/([1-9]\d*)$/)?.[1] || null,
  );
  const catalogScroll = useRef(0);
  const detailsOpen = useRef(!!movieId);
  useEffect(() => {
    let frame;
    const navigate = () => {
      const id =
        window.location.hash.match(/^#movie\/([1-9]\d*)$/)?.[1] || null;
      if (id && !detailsOpen.current) catalogScroll.current = window.scrollY;
      detailsOpen.current = !!id;
      setMovieId(id);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        window.scrollTo(0, id ? 0 : catalogScroll.current),
      );
    };
    window.addEventListener('hashchange', navigate);
    return () => {
      window.removeEventListener('hashchange', navigate);
      cancelAnimationFrame(frame);
    };
  }, []);
  const backToCatalog = () => {
    window.location.hash = '';
  };
  return { movieId, backToCatalog };
}
