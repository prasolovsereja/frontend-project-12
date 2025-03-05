import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice.js';

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet chat
        </a>
        {isAuthenticated ? (
          <button type="button" className="btn btn-primary" onClick={() => dispatch(logout())}>Выйти</button>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;