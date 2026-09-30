import { useCatalogContext } from '../../context/CatalogContext';
import ColorBends from '../ColorBends';
import MyInput from '../Input/Input';
export default function CatalogHero() {
  const { tab, changeTab, ratedMovies, watchedMovies, query, changeQuery } =
    useCatalogContext();
  return (
    <div className="hero-shell">
      <ColorBends
        className="hero-bends"
        rotation={90}
        speed={0.2}
        colors={['#dc27ff', '#FF9FFC', '#6776ff']}
        transparent
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
      />
      <header className="header page-container">
        <nav aria-label="Основная навигация">
          <button
            className={tab === 'search' ? 'nav-active' : ''}
            onClick={() => changeTab('search')}
          >
            Обзор
          </button>
          <button
            className={tab === 'rated' ? 'nav-active' : ''}
            onClick={() => changeTab('rated')}
          >
            Мои оценки <span className="count">{ratedMovies.length}</span>
          </button>
          <button
            className={tab === 'watched' ? 'nav-active' : ''}
            onClick={() => changeTab('watched')}
          >
            Просмотренное <span className="count">{watchedMovies.length}</span>
          </button>
        </nav>
        <span className="header-note">
          <span /> Место для хорошего кино
        </span>
      </header>
      <section className="intro page-container">
        <div className="eyebrow">
          <span /> ВАШ СЛЕДУЮЩИЙ КИНОВЕЧЕР
        </div>
        <h1>
          {tab === 'watched' ? (
            <>
              Уже в вашей <em>истории.</em>
            </>
          ) : tab === 'rated' ? (
            <>
              Кино, которое <em>с вами.</em>
            </>
          ) : (
            <>
              Хорошее кино.
              <br />В нужный <em>момент.</em>
            </>
          )}
        </h1>
        <p>
          {tab === 'watched'
            ? 'Все истории, которые вы уже посмотрели. Сохраняйте их здесь и возвращайтесь к любимым.'
            : tab === 'rated'
              ? 'Ваша коллекция впечатлений. Все фильмы, которым вы поставили оценку.'
              : 'Находите новые истории, оценивайте любимые фильмы\nи собирайте свою коллекцию впечатлений.'}
        </p>
      </section>
      {tab === 'search' && (
        <div className="hero-search page-container">
          <MyInput
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="Какой фильм ищем сегодня?"
          />
        </div>
      )}
    </div>
  );
}
