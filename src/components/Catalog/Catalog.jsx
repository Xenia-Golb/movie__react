/* eslint-disable react/prop-types */
import s from './Catalog.module.css';
import Card from '../Card/Card';
import { format } from 'date-fns';
import defaultImage from './img/defaultImage.jpg';

function Catalog({ movies }) {
  const defaultPoster = defaultImage;

  // Функция для форматирования даты
  const formatDate = (date) => {
    if (!date) return ' ';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return '';
    return format(parsedDate, 'dd MMM yyyy');
  };

  // Функция для обрезки текста
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
      {movies.map((movie) => {
        const imageUrl = movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : defaultPoster;

        return (
          <Card
            key={movie.id}
            image={imageUrl}
            title={movie.title}
            date={formatDate(movie.release_date)}
            description={truncateText(movie.overview)}
          />
        );
      })}
    </div>
  );
}

export default Catalog;
