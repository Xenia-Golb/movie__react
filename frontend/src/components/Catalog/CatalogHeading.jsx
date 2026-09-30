import { useCatalogContext } from '../../context/CatalogContext';
import Reload from '../../assets/icons/reload.svg?react';
export default function CatalogHeading() {
  const { tab, query, year, minRating, handleSync, syncing } =
    useCatalogContext();
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          {tab !== 'search'
            ? 'ЛИЧНАЯ КОЛЛЕКЦИЯ'
            : query.trim()
              ? 'ПОИСК ПО КАТАЛОГУ'
              : 'В ЦЕНТРЕ ВНИМАНИЯ'}
        </span>
        <div className="catalog-title-row">
          <h2 id="catalog-title">
            {tab === 'watched'
              ? 'Просмотренное'
              : tab === 'rated'
                ? 'Мои оценки'
                : query.trim()
                  ? `Результаты для «${query.trim()}»`
                  : year || minRating > 0
                    ? 'Фильмы по вашим условиям'
                    : 'Популярно на этой неделе'}
          </h2>
          <button
            className="sync-button"
            type="button"
            onClick={handleSync}
            disabled={syncing}
            aria-busy={syncing}
            aria-label={
              syncing ? 'Обновление базы фильмов' : 'Обновить базу фильмов'
            }
            title={
              syncing ? 'Обновление базы фильмов…' : 'Обновить базу фильмов'
            }
          >
            <Reload aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
