import { useEffect, useState } from 'react';
import './App.css';
import Catalog from './components/Catalog/Catalog';
import { Alert, Spin } from 'antd';

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {loading && movies.length === 0 ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              closable
              style={{ marginTop: 300 }}
              onClose={() => setError(null)}
            />
          )}
          {!loading && !error && <Catalog movies={movies} />}
        </>
      )}
    </div>
  );
}

export default App;
