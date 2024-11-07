import { useEffect, useState } from 'react';
import './App.css';
import Catalog from './components/Catalog/Catalog';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="app">
      <Catalog movies={movies} />
    </div>
  );
}

export default App;
