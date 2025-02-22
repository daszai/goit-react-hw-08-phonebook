import { logOut } from 'components/props/prop';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export const UserMenu = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn;
  });
  const logout = e => {
    e.preventDefault();
    if (isLoggedIn) {
      dispatch(logOut());
    }
  };
  const email = useSelector(state => {
    return state.auth.user.email;
  });

  return (
    <div>
      <p>{email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
