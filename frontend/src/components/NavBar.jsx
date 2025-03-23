import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logoutAndCleanup } from '../slices/authActions.js';

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('chat.header')}
        </a>
        {isAuthenticated ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(logoutAndCleanup())}
          >
            {t('interfaces.logOut')}
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
