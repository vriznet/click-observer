import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfRightSidePanelAppearances,
  ComponentOfRightSidePanelName,
  ComponentOfRightSidePanelVisibilities,
  PartialComponentOfRightSidePanelAppearances,
} from '../../types/data/rightSidePanel';
import { RootState } from '.';

export interface RightSidePanelState {
  componentOfRightSidePanelAppearances: ComponentOfRightSidePanelAppearances;
  componentOfRightSidePanelVisibilities: ComponentOfRightSidePanelVisibilities;
}

const initialState: RightSidePanelState = {
  componentOfRightSidePanelAppearances: {
    '': {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    Blue: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
    Black: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      zIndex: 0,
    },
  },
  componentOfRightSidePanelVisibilities: {
    '': false,
    Blue: false,
    Black: false,
  },
};

export const rightSidePanelSlice = createSlice({
  name: 'rightSidePanel',
  initialState,
  reducers: {
    setComponentOfRightSidePanelAppearances: (
      state,
      action: PayloadAction<ComponentOfRightSidePanelAppearances>
    ) => {
      state.componentOfRightSidePanelAppearances = action.payload;
    },
    updateComponentOfRightSidePanelAppearances: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfRightSidePanelName;
        appearances: PartialComponentOfRightSidePanelAppearances;
      }>
    ) => {
      state.componentOfRightSidePanelAppearances[action.payload.componentName] =
        {
          ...state.componentOfRightSidePanelAppearances[
            action.payload.componentName
          ],
          ...action.payload.appearances,
        };
    },
    setComponentOfRightSidePanelVisibilities: (
      state,
      action: PayloadAction<ComponentOfRightSidePanelVisibilities>
    ) => {
      state.componentOfRightSidePanelVisibilities = action.payload;
    },
    updateComponentOfRightSidePanelVisibilities: (
      state,
      action: PayloadAction<{
        componentName: ComponentOfRightSidePanelName;
        visibility: boolean;
      }>
    ) => {
      state.componentOfRightSidePanelVisibilities[
        action.payload.componentName
      ] = action.payload.visibility;
    },
  },
});

export const {
  setComponentOfRightSidePanelAppearances,
  updateComponentOfRightSidePanelAppearances,
  setComponentOfRightSidePanelVisibilities,
  updateComponentOfRightSidePanelVisibilities,
} = rightSidePanelSlice.actions;

export const selectComponentOfRightSidePanelAppearances = (state: RootState) =>
  state.rightSidePanel.componentOfRightSidePanelAppearances;
export const selectComponentOfRightSidePanelVisibilities = (state: RootState) =>
  state.rightSidePanel.componentOfRightSidePanelVisibilities;

export default rightSidePanelSlice.reducer;
