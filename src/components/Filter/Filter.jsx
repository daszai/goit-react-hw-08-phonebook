import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { contactsFilters } from 'components/prop';
const Filter = () => {
  const filter = useSelector(state => state.name);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(contactsFilters(e.nativeEvent.target.value));
  };

  return (
    <form>
      <input type="text" value={filter} onChange={changeFilter} />
    </form>
  );
};

export default Filter;
