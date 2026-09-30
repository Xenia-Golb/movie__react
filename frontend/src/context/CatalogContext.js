import { createContext, useContext } from 'react';

export const CatalogContext = createContext(null);

export function useCatalogContext() {
  const catalog = useContext(CatalogContext);
  if (!catalog)
    throw new Error('useCatalogContext must be used within CatalogProvider');
  return catalog;
}
