import { Alert } from 'antd';
import { useCatalogContext } from '../../context/CatalogContext';

export default function CatalogNotices() {
  const { syncNotice, ratingError, watchedError } = useCatalogContext();
  return (
    <>
      {syncNotice && (
        <Alert
          type={syncNotice.type}
          message={syncNotice.message}
          showIcon
          role="status"
          className="notice"
        />
      )}
      {(ratingError || watchedError) && (
        <Alert
          type="warning"
          showIcon
          message={watchedError || ratingError}
          className="notice"
        />
      )}
    </>
  );
}
