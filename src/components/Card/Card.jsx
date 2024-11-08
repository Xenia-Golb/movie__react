/* eslint-disable react/prop-types */
import s from './Card.module.css';
function Card({ title, date, description, image }) {
  return (
    <div className={s['card-movie']}>
      <img className={s['card-movie__img']} src={image} alt="Movie poster" />
      <div className={s['card-movie__info']}>
        <h3 className={s['title']}>{title}</h3>
        <p className={s['date']}>{date}</p>
        <p className={s['genre']}>Genre</p>
        <p className={s['description']}>{description}</p>
      </div>
    </div>
  );
}

export default Card;
