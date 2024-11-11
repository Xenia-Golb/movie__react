/* eslint-disable react/prop-types */
import s from './Catalog.module.css';
import Card from '../Card/Card';
import { format } from 'date-fns';
import defaultImage from './img/defaultImage.jpg';
import { useMovieContext } from '../../context/MovieContext';

function Catalog({ movies }) {
  const { genres } = useMovieContext();

  const getGenres = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name !== null);
  };

  const formatDate = (date) => {
    if (!date) return ' ';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return '';
    return format(parsedDate, 'dd MMM yyyy');
  };

  function truncateText(text, maxLength = 100) {
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
          : defaultImage;

        const genreList = getGenres(movie.genre_ids);

        return (
          <Card
            key={movie.id}
            image={imageUrl}
            title={movie.title}
            date={formatDate(movie.release_date)}
            genre={
              genreList.length > 0 ? (
                <div className={s.genres}>
                  {genreList.map((genre, index) => (
                    <span className={s.genre} key={index}>
                      {genre}
                    </span>
                  ))}
                </div>
              ) : (
                <span>No genres available</span>
              )
            }
            description={truncateText(movie.overview)}
          />
        );
      })}
    </div>
  );
}

export default Catalog;
