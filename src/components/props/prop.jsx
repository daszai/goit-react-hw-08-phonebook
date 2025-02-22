import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
axios.defaults.baseURL = 'https://connections-api.goit.global/';
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const fetchTasksGet = createAsyncThunk(
  'tasks2/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
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
      await axios.post('/contacts', { ...TEXT });
      return { ...TEXT, new: 'new' };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});
export const authReducer = authSlice.reducer;

export const fetchTasksDelete = createAsyncThunk(
  'tasks2/fetchAll',
  async (TEXT, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      let temp = response.data;

      let temp2 = temp.filter(obj => {
        if (TEXT.name === obj.name) {
          return true;
        }
        return false;
      });
      await axios.delete(`/contacts/${temp2[0].id}`);
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

        if (action.payload.new === 'new2') {
          state.contact = action.payload.temp2;
          return;
        }
        if (action.payload.new === 'new') {
          state.contact.push({
            name: action.payload.name,
            id: nanoid(),
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
  initialState: '',
  reducers: {
    contactsFilters(state, action) {
      const temp = action.payload;
      return temp;
    },
  },
});
export const tasksReducer = tasksSlice.reducer;
export const tasksReducer2 = tasksSlice2.reducer;

export const { contactsFilters } = tasksSlice2.actions;
