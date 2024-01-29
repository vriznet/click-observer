import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfLeftSidePanelAppearances,
  ComponentOfLeftSidePanelName,
  ComponentOfLeftSidePanelVisibilities,
  PartialComponentOfLeftSidePanelAppearances,
} from '../../types/data/leftSidePanel';
import { RootState } from '.';

export interface LeftSidePanelState {
  componentOfLeftSidePanelAppearances: ComponentOfLeftSidePanelAppearances;
  componentOfLeftSidePanelVisibilities: ComponentOfLeftSidePanelVisibilities;
}

const initialState: LeftSidePanelState = {
  componentOfLeftSidePanelAppearances: {
    '': {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    Red: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    Green: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
  },
  componentOfLeftSidePanelVisibilities: {
    '': false,
    Red: false,
    Green: false,
  },
};

export const leftSidePanelSlice = createSlice({
  name: 'leftSidePanel',
  initialState,
  reducers: {
    setComponentOfLeftSidePanelAppearances: (
      state,
      action: PayloadAction<ComponentOfLeftSidePanelAppearances>
    ) => {
      state.componentOfLeftSidePanelAppearances = action.payload;
    },
    updateComponentOfLeftSidePanelAppearances: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfLeftSidePanelName;
        appearances: PartialComponentOfLeftSidePanelAppearances;
      }>
    ) => {
      state.componentOfLeftSidePanelAppearances[action.payload.componentName] =
        {
          ...state.componentOfLeftSidePanelAppearances[
            action.payload.componentName
          ],
          ...action.payload.appearances,
        };
    },
    setComponentOfLeftSidePanelVisibilities: (
      state,
      action: PayloadAction<ComponentOfLeftSidePanelVisibilities>
    ) => {
      state.componentOfLeftSidePanelVisibilities = action.payload;
    },
    updateComponentOfLeftSidePanelVisibilities: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfLeftSidePanelName;
        visibility: boolean;
      }>
    ) => {
      state.componentOfLeftSidePanelVisibilities[action.payload.componentName] =
        action.payload.visibility;
    },
  },
});

export const {
  setComponentOfLeftSidePanelAppearances,
  updateComponentOfLeftSidePanelAppearances,
  setComponentOfLeftSidePanelVisibilities,
  updateComponentOfLeftSidePanelVisibilities,
} = leftSidePanelSlice.actions;

export const selectComponentOfLeftSidePanelAppearances = (state: RootState) =>
  state.leftSidePanel.componentOfLeftSidePanelAppearances;
export const selectComponentOfLeftSidePanelVisibilities = (state: RootState) =>
  state.leftSidePanel.componentOfLeftSidePanelVisibilities;

export default leftSidePanelSlice.reducer;
