import { CatalogContext } from './CatalogContext';
import useCatalog from '../hooks/useCatalog';

// eslint-disable-next-line react/prop-types
export default function CatalogProvider({ children }) {
  const catalog = useCatalog();
  return (
    <CatalogContext.Provider value={catalog}>
      {children}
    </CatalogContext.Provider>
  );
}
