import s from './Catalog.module.css'
import Card from '../Card/Card';
function Catalog({ movies }) {

    return (<div className={s['catalog-container']}>
        {movies.length > 0 ? (
            movies.map((movie) => (
                <Card
                    key={movie.id}
                    image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    title={movie.title}
                    date={movie.release_date.split('-')[0]}
                    description={movie.overview}
                />
            ))
        ) : (
            <p>Loading movies...</p>
        )}
    </div>);
}

export default Catalog;