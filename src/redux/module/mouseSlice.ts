import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export interface MouseState {
  cursorX: number;
  cursorY: number;
}

const initialState: MouseState = {
  cursorX: 10,
  cursorY: 10,
};

export const mouseSlice = createSlice({
  name: 'mouse',
  initialState,
  reducers: {
    setCursorX(state, action) {
      state.cursorX = action.payload;
    },
    setCursorY(state, action) {
      state.cursorY = action.payload;
    },
  },
});

export const { setCursorX, setCursorY } = mouseSlice.actions;

export const selectCursorX = (state: RootState) => state.mouse.cursorX;
export const selectCursorY = (state: RootState) => state.mouse.cursorY;

export default mouseSlice.reducer;
