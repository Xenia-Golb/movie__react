import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CatalogProvider from './context/CatalogProvider';
import { MovieProvider } from './context/MovieContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieProvider>
      <CatalogProvider>
        <App />
      </CatalogProvider>
    </MovieProvider>
  </StrictMode>,
);
