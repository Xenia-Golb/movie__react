import { useRef, useState } from 'react';
import { syncAllMovies } from '../api';

export default function useMovieSync(onSuccess) {
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState(null);
  const syncInFlight = useRef(false);
  const handleSync = async () => {
    if (syncInFlight.current) return;
    syncInFlight.current = true;
    setSyncing(true);
    setSyncNotice(null);
    try {
      const { updated } = await syncAllMovies();
      setSyncNotice({
        type: 'success',
        message: `Обновлено фильмов: ${updated}`,
      });
      onSuccess();
    } catch {
      setSyncNotice({
        type: 'error',
        message: 'Не удалось обновить базу фильмов. Попробуйте ещё раз.',
      });
    } finally {
      syncInFlight.current = false;
      setSyncing(false);
    }
  };
  return { syncing, syncNotice, handleSync };
}
