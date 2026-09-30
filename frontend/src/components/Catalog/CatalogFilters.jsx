import { useCatalogContext } from '../../context/CatalogContext';

export default function CatalogFilters() {
  const {
    tab,
    query,
    genre,
    setGenre,
    availableGenres,
    year,
    changeYear,
    minRating,
    changeMinRating,
    hasFilters,
    resetFilters,
  } = useCatalogContext();
  const years = Array.from(
    { length: new Date().getFullYear() + 2 - 1874 + 1 },
    (_, index) => new Date().getFullYear() + 2 - index,
  );
  return (
    <>
      <div className="filters" aria-label="Фильтр жанров на текущей странице">
        {['Все жанры', ...availableGenres.map((item) => item.name)].map(
          (name) => (
            <button
              key={name}
              aria-pressed={genre === name}
              className={genre === name ? 'selected' : ''}
              onClick={() => setGenre(name)}
            >
              {name}
            </button>
          ),
        )}
      </div>
      <div className="catalog-filters">
        <label htmlFor="release-year">
          Год выпуска
          <select
            id="release-year"
            value={year}
            onChange={(event) => changeYear(event.target.value)}
          >
            <option value="">Все годы</option>
            {years.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="minimum-rating">
          Рейтинг TMDB
          <select
            id="minimum-rating"
            value={minRating}
            onChange={(event) => changeMinRating(Number(event.target.value))}
          >
            <option value={0}>Любой рейтинг</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <option key={value} value={value}>
                От {value} и выше
              </option>
            ))}
          </select>
        </label>
        {hasFilters && (
          <button className="reset-filters" onClick={resetFilters}>
            Сбросить фильтры ×
          </button>
        )}
        {tab === 'search' && query.trim() && minRating > 0 && (
          <p className="filter-note">
            Рейтинг применяется к текущей странице результатов поиска.
          </p>
        )}
      </div>
    </>
  );
}
