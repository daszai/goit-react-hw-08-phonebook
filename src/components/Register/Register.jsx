import { register } from 'components/props/prop';
import { useDispatch } from 'react-redux';
export const Register = () => {
  const dispatch = useDispatch();
  const assume = e => {
    e.preventDefault();
    if (
      e.nativeEvent.target.parentElement[0].value &&
      e.nativeEvent.target.parentElement[1].value &&
      e.nativeEvent.target.parentElement[2].value
    ) {
      dispatch(
        register({
          name: e.nativeEvent.target.parentElement[0].value,
          email: e.nativeEvent.target.parentElement[1].value,
          password: e.nativeEvent.target.parentElement[2].value,
        })
      );
    }
  };
  return (
    <form>
      <div>
        name
        <input type="text" name="name" required />
      </div>
      <div>
        email
        <input type="text" name="email" required />
      </div>
      <div>
        password
        <input type="text" name="password" required />
      </div>
      <button onClick={assume}>załóż konto</button>
    </form>
  );
};
