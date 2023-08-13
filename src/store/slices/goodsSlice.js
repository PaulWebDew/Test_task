import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoods = createAsyncThunk('goods/fetchGoods', async () => {
  const { data } = await axios.get('https://dummyjson.com/products');
  return data;
});

const initialState = {
  value: [],
  status: 'loading',
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state, action) => {});
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.value = action.payload.products;
      state.status = 'succes';
    });
    builder.addCase(fetchGoods.rejected, (state, action) => {
      state.value = [];
      state.status = 'Error';
    });
  },
});

export default goodsSlice.reducer;
