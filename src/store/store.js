import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import actionSlice from './slices/actionSlice';
import goodsSlice from './slices/goodsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    actions: actionSlice,
    goods: goodsSlice,
  },
});
