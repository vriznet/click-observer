import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfScreenAppearances,
  ComponentOfScreenName,
  ComponentOfScreenVisibilities,
  PartialComponentOfScreenAppearances,
} from '../../types/data/screen';
import { RootState } from '.';

export interface ScreenState {
  componentOfScreenAppearances: ComponentOfScreenAppearances;
  componentOfScreenVisibilities: ComponentOfScreenVisibilities;
}

const initialState: ScreenState = {
  componentOfScreenAppearances: {
    '': {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    LeftSidePanel: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    RightSidePanel: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
  },
  componentOfScreenVisibilities: {
    '': false,
    LeftSidePanel: false,
    RightSidePanel: false,
  },
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setComponentOfScreenAppearances: (
      state,
      action: PayloadAction<ComponentOfScreenAppearances>
    ) => {
      state.componentOfScreenAppearances = action.payload;
    },
    updateComponentOfScreenAppearances: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfScreenName;
        appearances: PartialComponentOfScreenAppearances;
      }>
    ) => {
      state.componentOfScreenAppearances = {
        ...state.componentOfScreenAppearances,
        [action.payload.componentName]: {
          ...state.componentOfScreenAppearances[action.payload.componentName],
          ...action.payload.appearances,
        },
      };
    },
    setComponentOfScreenVisibilities: (
      state,
      action: PayloadAction<ComponentOfScreenVisibilities>
    ) => {
      state.componentOfScreenVisibilities = action.payload;
    },
    updateComponentOfScreenVisibilities: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfScreenName;
        visibility: boolean;
      }>
    ) => {
      state.componentOfScreenVisibilities = {
        ...state.componentOfScreenVisibilities,
        [action.payload.componentName]: action.payload.visibility,
      };
    },
  },
});

export const {
  setComponentOfScreenAppearances,
  updateComponentOfScreenAppearances,
  setComponentOfScreenVisibilities,
  updateComponentOfScreenVisibilities,
} = screenSlice.actions;

export const selectComponentOfScreenAppearances = (state: RootState) =>
  state.screen.componentOfScreenAppearances;
export const selectComponentOfScreenVisibilities = (state: RootState) =>
  state.screen.componentOfScreenVisibilities;

export default screenSlice.reducer;
