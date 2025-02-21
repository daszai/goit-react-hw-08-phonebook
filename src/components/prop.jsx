import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';

const tasksInitialState = {
  contacts: [
    { name: 'hej', id: 1, number: 5454 },
    { name: 'he43j', id: 2, number: 543454 },
    { name: '4h43ej', id: 3, number: 54435254 },
    { name: 'STORE', id: 4, number: 454435254 },
  ],
  name: '',
};

export const fetchTasksGet = createAsyncThunk(
  'tasks2/fetchAll',
  async (TEXT, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://67b0506cdffcd88a6788e23e.mockapi.io/contacts/contacts'
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchTasksPost = createAsyncThunk(
  'tasks2/fetchAll',
  async (TEXT, thunkAPI) => {
    try {
      await axios.post(
        'https://67b0506cdffcd88a6788e23e.mockapi.io/contacts/contacts',
        { ...TEXT }
      );
      return { ...TEXT, new: 'new' };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
////////////////////////////////////////////////////////////////////////////////////////////////////
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchCreateUser = createAsyncThunk(
  'tasks2/fetchAll',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post(
        'https://connections-api.goit.global/users/signup',
        credentials
      );
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.token);
      console.log(res.data.token);
      return { data: res.data, new: 'new3' };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//////////////////////////////////////////////////////////////////////////////////////////////////
export const fetchTasksDelete = createAsyncThunk(
  'tasks2/fetchAll',
  async (TEXT, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://67b0506cdffcd88a6788e23e.mockapi.io/contacts/contacts'
      );
      let temp = response.data;

      let temp2 = temp.filter(obj => {
        if (TEXT.name === obj.name) {
          return true;
        }
        return false;
      });
      await axios.delete(
        `https://67b0506cdffcd88a6788e23e.mockapi.io/contacts/contacts/${temp2[0].id}`
      );
      temp2 = temp.filter(obj => {
        if (TEXT.name === obj.name) {
          return false;
        }
        return true;
      });
      return { temp2, new: 'new2' };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    contact: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.new === 'new3') {
          console.log('hej');
          return;
        }
        if (action.payload.new === 'new2') {
          state.contact = action.payload.temp2;
          return;
        }
        if (action.payload.new === 'new') {
          state.contact.push({
            name: action.payload.name,
            id2: action.payload.id2,
            number: action.payload.tel,
          });
          return;
        }
        state.contact = action.payload;
      })
      .addCase(rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
      })
      .addDefaultCase((state, action) => {});
  },
});

const pending = createAction('tasks2/fetchAll/pending');
const fulfilled = createAction('tasks2/fetchAll/fulfilled');
const rejected = createAction('tasks2/fetchAll/rejected');

const tasksSlice2 = createSlice({
  name: 'filter',
  initialState: tasksInitialState.name,
  reducers: {
    contactsFilters(state, action) {
      const temp = action.payload;
      return temp;
    },
  },
});
const tasksReducer = tasksSlice.reducer;
const tasksReducer2 = tasksSlice2.reducer;

export const { contactsFilters } = tasksSlice2.actions;

export const store = configureStore({
  reducer: {
    contacts: tasksReducer,
    name: tasksReducer2,
  },
});
