import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Coord } from '../../types/data/common';
import {
  CommonComponentMouseActionState,
  ComponentMouseActionState,
  MouseActionState,
} from '../../types/states';
import { generateInitialComponentClickStatus } from '../../utils';
import { componentNameList } from '../../data/common';
import { ComponentName } from '../../types/data/componentName';

export interface MouseState {
  cursorX: number;
  cursorY: number;
  clickedCoord: Coord;
  mouseActionState: MouseActionState;
  componentClickStatus: CommonComponentMouseActionState;
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
  componentClickStatus: generateInitialComponentClickStatus(componentNameList),
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
    updateComponentClickStatus(
      state,
      action: PayloadAction<{
        componentName: ComponentName;
        clickStatus: Partial<MouseActionState>;
      }>
    ) {
      state.componentClickStatus[action.payload.componentName] = {
        ...state.componentClickStatus[action.payload.componentName],
        ...action.payload.clickStatus,
      };
    },
    updateAllComponentClickStatus(
      state,
      action: PayloadAction<Partial<ComponentMouseActionState>>
    ) {
      state.componentClickStatus = {
        ...state.componentClickStatus,
        ...componentNameList.reduce((clickStatus, componentName) => {
          return {
            ...clickStatus,
            [componentName]: {
              ...state.componentClickStatus[componentName],
              ...action.payload,
            },
          };
        }, {} as CommonComponentMouseActionState),
      };
    },
  },
});

export const {
  setCursorX,
  setCursorY,
  setClickedCoord,
  setMouseActionState,
  updateMouseActionState,
  updateComponentClickStatus,
  updateAllComponentClickStatus,
} = mouseSlice.actions;

export const selectCursorX = (state: RootState) => state.mouse.cursorX;
export const selectCursorY = (state: RootState) => state.mouse.cursorY;
export const selectClickedCoord = (state: RootState) =>
  state.mouse.clickedCoord;
export const selectMouseActionState = (state: RootState) =>
  state.mouse.mouseActionState;
export const selectComponentClickStatus = (state: RootState) =>
  state.mouse.componentClickStatus;

export default mouseSlice.reducer;
