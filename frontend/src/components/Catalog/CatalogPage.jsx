import CatalogNotices from './CatalogNotices';
import CatalogPagination from './CatalogPagination';
import CatalogHero from './CatalogHero';
import CatalogHeading from './CatalogHeading';
import CatalogFilters from './CatalogFilters';
import CatalogContent from './CatalogContent';
export default function CatalogPage() {
  return (
    <div className="app">
      <CatalogHero />
      <main className="page-container">
        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog-toolbar">
            <CatalogHeading />
            <CatalogFilters />
          </div>
          <CatalogNotices />
          <CatalogContent />
          <CatalogPagination />
        </section>
      </main>
      <footer className="page-container">
        <span>Жизнь слишком коротка для плохого кино.</span>
        <span>Данные предоставлены TMDB</span>
      </footer>
    </div>
  );
}
