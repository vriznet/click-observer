import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Coord } from '../../types/data/common';
import { MouseActionState } from '../../types/states';

export interface MouseState {
  cursorX: number;
  cursorY: number;
  clickedCoord: Coord;
  mouseActionState: MouseActionState;
}

const initialState: MouseState = {
  cursorX: 10,
  cursorY: 10,
  clickedCoord: { x: 0, y: 0 },
  mouseActionState: {
    isClicking: false,
    isClickStarted: false,
    isClickEnded: false,
    isShortClicked: false,
    isDblClicked: false,
    isLongClickStarted: false,
    isLongClickEnded: false,
  },
};

export const mouseSlice = createSlice({
  name: 'mouse',
  initialState,
  reducers: {
    setCursorX(state, action: PayloadAction<number>) {
      state.cursorX = action.payload;
    },
    setCursorY(state, action: PayloadAction<number>) {
      state.cursorY = action.payload;
    },
    setClickedCoord(state, action: PayloadAction<Coord>) {
      state.clickedCoord = action.payload;
    },
    setMouseActionState(state, action: PayloadAction<MouseActionState>) {
      state.mouseActionState = action.payload;
    },
    updateMouseActionState(
      state,
      action: PayloadAction<Partial<MouseActionState>>
    ) {
      state.mouseActionState = { ...state.mouseActionState, ...action.payload };
    },
  },
});

export const {
  setCursorX,
  setCursorY,
  setClickedCoord,
  setMouseActionState,
  updateMouseActionState,
} = mouseSlice.actions;

export const selectCursorX = (state: RootState) => state.mouse.cursorX;
export const selectCursorY = (state: RootState) => state.mouse.cursorY;
export const selectClickedCoord = (state: RootState) =>
  state.mouse.clickedCoord;
export const selectMouseActionState = (state: RootState) =>
  state.mouse.mouseActionState;

export default mouseSlice.reducer;
