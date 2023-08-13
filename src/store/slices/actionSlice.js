import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    addAction(state, { payload }) {
      state.value.push(payload);
    },
  },
});

export const { addAction } = actionsSlice.actions;
export default actionsSlice.reducer;
