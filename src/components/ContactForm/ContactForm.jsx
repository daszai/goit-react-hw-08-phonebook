import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasksGet } from 'components/props/prop';
import { useDispatch } from 'react-redux';
import { fetchTasksPost } from 'components/props/prop';

const ContactForm = props => {
  const contacts = useSelector(state => state.contacts.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksGet());
  }, [dispatch]);

  const click = e => {
    e.preventDefault();
    const name = e.nativeEvent.target.parentElement[0].value;
    const tel = e.nativeEvent.target.parentElement[1].value;

    if (
      !contacts.some(e => {
        if (name === e.name) {
          return true;
        }
        return false;
      })
    ) {
      dispatch(fetchTasksPost({ name: name, number: tel }));
    } else alert(`${name} is already in contact`);
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        // pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
        required
      />
      <input
        type="tel"
        name="number"
        // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button onClick={click} type="submit">
        Add Contact
      </button>
    </form>
  );
};
export default ContactForm;
