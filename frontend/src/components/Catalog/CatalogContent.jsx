import { useCatalogContext } from '../../context/CatalogContext';
import MovieList from '../MovieList/MovieList';
export default function CatalogContent() {
  const { tab, error, loading, visible, hasFilters, resetCatalog, reload } =
    useCatalogContext();
  return (
    <>
      {tab === 'search' && error ? (
        <div className="empty-state">
          <span>↗</span>
          <h3>Не удалось загрузить фильмы</h3>
          <p>{error}</p>
          <button onClick={() => reload()}>Попробовать снова</button>
        </div>
      ) : tab === 'search' && loading ? (
        <div
          className="skeleton-grid"
          aria-label="Загрузка фильмов"
          role="status"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <div className="skeleton" key={index} />
          ))}
        </div>
      ) : visible.length ? (
        <MovieList movies={visible} />
      ) : (
        <div className="empty-state">
          <span>✳</span>
          <h3>
            {hasFilters
              ? 'Нет фильмов по выбранным условиям'
              : tab === 'watched'
                ? 'Здесь будет ваше просмотренное кино'
                : tab === 'rated'
                  ? 'Ваша история кино начинается здесь'
                  : 'Таких фильмов не нашлось'}
          </h3>
          <p>
            {hasFilters
              ? 'Попробуйте другой год, снизьте рейтинг или сбросьте фильтры.'
              : tab === 'watched'
                ? 'Откройте страницу фильма и нажмите «Уже смотрела» — он появится здесь.'
                : tab === 'rated'
                  ? 'Поставьте оценку на странице фильма — он появится в вашей коллекции.'
                  : 'Попробуйте другое название или выберите другой жанр.'}
          </p>
          <button onClick={resetCatalog}>
            {hasFilters
              ? 'Сбросить фильтры'
              : tab !== 'search'
                ? 'Найти первый фильм'
                : 'Вернуться к популярному'}
          </button>
        </div>
      )}
    </>
  );
}
