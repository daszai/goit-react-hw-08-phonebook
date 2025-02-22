import { logIn } from 'components/props/prop';
import { useDispatch } from 'react-redux';
export const Login = () => {
  const dispatch = useDispatch();
  const log = e => {
    e.preventDefault();
    if (
      e.nativeEvent.target.parentElement[0].value &&
      e.nativeEvent.target.parentElement[1].value
    ) {
      dispatch(
        logIn({
          email: e.nativeEvent.target.parentElement[0].value,
          password: e.nativeEvent.target.parentElement[1].value,
        })
      );
    }
  };

  return (
    <form>
      <div>
        email
        <input type="text" name="email" required />
      </div>
      <div>
        password
        <input type="text" name="password" required />
      </div>
      <button onClick={log}>zaloguj</button>
    </form>
  );
};
