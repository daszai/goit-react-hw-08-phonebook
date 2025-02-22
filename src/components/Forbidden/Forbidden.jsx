import { useSelector } from 'react-redux';

export const Forbidden = ({ comp: Comp }) => {
  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn;
  });

  return isLoggedIn ? Comp : null;
};
