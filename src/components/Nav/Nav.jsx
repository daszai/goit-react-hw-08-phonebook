import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import css from './Nav.module.css';
export const Nav = () => {
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn;
  });
  return (
    <>
      <nav>
        <Link to="/register" className={css.a}>
          register
        </Link>
        <Link to="/login" className={css.a}>
          login
        </Link>
        {isLoggedIn && (
          <Link to="/contacts" className={css.a}>
            contacts
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/logout" className={css.a}>
            logout
          </Link>
        )}
      </nav>

      <Outlet />
    </>
  );
};
