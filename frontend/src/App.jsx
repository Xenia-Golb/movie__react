import { ConfigProvider, theme } from 'antd';
import MovieDetails from './components/MovieDetails/MovieDetails';
import CatalogPage from './components/Catalog/CatalogPage';
import useMovieNavigation from './hooks/useMovieNavigation';
import './App.css';

function App() {
  const { movieId, backToCatalog } = useMovieNavigation();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#f5a9c7',
          colorBgContainer: '#261c26',
          fontFamily: 'Inter, sans-serif',
          borderRadius: 10,
        },
      }}
    >
      {movieId ? (
        <MovieDetails key={movieId} movieId={movieId} onBack={backToCatalog} />
      ) : (
        <CatalogPage />
      )}
    </ConfigProvider>
  );
}
export default App;
