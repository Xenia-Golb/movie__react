import s from './Catalog.module.css'
import { data } from './data';
import Card from '../Card/Card';
function Catalog() {
    const movies = data;

    return (<div className={s['catalog-container']}>
        {
            movies.map((movie, index) => (
                <Card
                    key={index}
                    image={movie.image}
                    title={movie.title}
                    date={movie.date}
                    description={movie.description}
                />
            ))
        }
    </div>);
}

export default Catalog;