import { useTranslation } from 'react-i18next';
import NavBar from '../components/NavBar.jsx';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <div className="text-center">
        <h1 className="h4 text-muted">{t('info.notFound')}</h1>
        <p className="text-muted">
          {t('info.youCan')}
          <a href="/">{t('info.onHomePage')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
