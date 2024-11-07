import s from './Catalog.module.css';
import Card from '../Card/Card';
import { format } from 'date-fns';

// eslint-disable-next-line react/prop-types
function Catalog({ movies }) {
  const formatDate = (date) => {
    return format(new Date(date), 'MMMM d, yyyy');
  };
  function truncateText(text, maxLength = 160) {
    if (text.length <= maxLength) return text;
    let truncated = text.slice(0, maxLength);

    const lastSentenceEnd = Math.max(
      truncated.lastIndexOf('.'),
      truncated.lastIndexOf('!'),
      truncated.lastIndexOf('?'),
    );

    if (lastSentenceEnd !== -1) {
      truncated = truncated.slice(0, lastSentenceEnd + 1);
    }
    return truncated + (truncated.length < text.length ? '..' : '');
  }

  return (
    <div className={s['catalog-container']}>
      {
        // eslint-disable-next-line react/prop-types
        movies.map((movie) => (
          <Card
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            title={movie.title}
            date={formatDate(movie.release_date)}
            description={truncateText(movie.overview)}
          />
        ))
      }
    </div>
  );
}

export default Catalog;
