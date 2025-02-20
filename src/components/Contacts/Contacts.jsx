import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksDelete } from 'components/prop';

const Contacts = () => {
  const contacts = useSelector(state => state.contacts.contact);
  const filter = useSelector(state => state.name);
  const dispatch = useDispatch();

  const deleteContacts = e => {
    dispatch(
      fetchTasksDelete({ name: e.currentTarget.name, contacts: contacts })
    );
  };

  let temp = filter.toLowerCase();
  let contact = contacts;
  let temp3 = false;
  if (temp.length > 0)
    contact = contacts.filter(e => {
      for (let i = 0; i < e.name.length; i++) {
        if (e.name[i].toLowerCase() === temp[0]) {
          temp3 = true;
          for (let j = 0; j < temp.length; j++) {
            if (j + i < e.name.length) {
              if (e.name[j + i].toLowerCase() !== temp[j]) {
                temp3 = false;
              }
            } else temp3 = false;
          }
          if (temp3 === true) {
            temp3 = false;
            return true;
          }
        }
      }
      return false;
    });

  ///////////////////////////////////
  return (
    <>
      <div>Contacts</div>
      {contact.map(obj => {
        return (
          <div key={obj.id2}>
            {obj.name} : {obj.number}{' '}
            <button name={obj.name} onClick={deleteContacts}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export const Contact = Contacts;
