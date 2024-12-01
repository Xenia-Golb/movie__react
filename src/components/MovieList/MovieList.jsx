/* eslint-disable react/prop-types */
import s from './MovieList.module.css';
import Card from '../Card/Card';
import { format } from 'date-fns';
import defaultImage from '../../assets/img/defaultImg.png';
import { useMovieContext } from '../../context/MovieContext';
import { Rate } from 'antd';

const getRatingColor = (rating) => {
  if (rating <= 3) return '#E90000';
  if (rating <= 5) return '#E97E00';
  if (rating <= 7) return '#E9D100';
  return '#66E900';
};

function MovieList({ movies }) {
  const { rateMovie, genres } = useMovieContext();

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
                  {genreList.slice(3).map((genre) => (
                    <span className={s.genre} key={genre}>
                      {genre}
                    </span>
                  ))}
                </div>
              ) : (
                ''
              )
            }
            description={truncateText(movie.overview)}
            className={s['card-movie']}
            rating={
              <div
                className={s['rating-circle']}
                style={{
                  backgroundColor: getRatingColor(movie.vote_average),
                }}
              >
                {movie.vote_average.toFixed(1)}
              </div>
            }
            addRate={
              <Rate
                defaultValue={movie.rating}
                onChange={(value) => rateMovie(movie, value)}
              />
            }
          />
        );
      })}
    </div>
  );
}

export default MovieList;
