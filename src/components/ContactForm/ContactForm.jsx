import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasksget } from 'components/prop';
import { useDispatch } from 'react-redux';
import { fetchTaskspost } from 'components/prop';

import { nanoid } from '@reduxjs/toolkit';

const ContactForm = props => {
  const contacts = useSelector(state => state.contacts.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksget());
  }, [dispatch]);

  const click = e => {
    e.preventDefault();
    const name = e.nativeEvent.target.parentElement[0].value;
    const tel = e.nativeEvent.target.parentElement[1].value;
    const id = nanoid();

    if (
      !contacts.some(e => {
        if (name === e.name) {
          return true;
        }
        return false;
      })
    ) {
      dispatch(fetchTaskspost({ name: name, phone: tel, id2: id }));
    } else alert(`${name} is already in contact`);
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        // pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
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
