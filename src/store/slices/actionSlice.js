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
    refreshActions(state, { payload }) {
      state.value = [];
    },
  },
});

export const { addAction, refreshActions } = actionsSlice.actions;
export default actionsSlice.reducer;
