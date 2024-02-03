import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfScreenName,
  ComponentOfScreenVisibilities,
} from '../../types/data/screen';
import { RootState } from '.';

export interface ScreenState {
  componentOfScreenVisibilities: ComponentOfScreenVisibilities;
}

const initialState: ScreenState = {
  componentOfScreenVisibilities: {
    LeftSidePanel: false,
    RightSidePanel: false,
  },
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
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
  setComponentOfScreenVisibilities,
  updateComponentOfScreenVisibilities,
} = screenSlice.actions;

export const selectComponentOfScreenVisibilities = (state: RootState) =>
  state.screen.componentOfScreenVisibilities;

export default screenSlice.reducer;
