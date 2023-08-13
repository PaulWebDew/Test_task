import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (chunc) => {
  const { data } = await axios.get('https://test.relabs.ru/api/users/list', {
    params: {
      limit: 5,
      offset: (chunc - 1) * 5,
    },
  });
  return data;
});

const initialState = {
  status: '',
  value: {},
  items: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deliteItem(state, action) {
      state.items = state.items.filter((item) => item.id.toString() !== action.payload.toString());
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'success';
      state.value = action.payload;
      state.items = action.payload.items;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'Error';
    });
  },
});

export const { deliteItem } = userSlice.actions;
export default userSlice.reducer;
