import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfRightSidePanelName,
  ComponentOfRightSidePanelVisibilities,
} from '../../types/data/rightSidePanel';
import { RootState } from '.';

export interface RightSidePanelState {
  componentOfRightSidePanelVisibilities: ComponentOfRightSidePanelVisibilities;
}

const initialState: RightSidePanelState = {
  componentOfRightSidePanelVisibilities: {
    Blue: false,
    Black: false,
  },
};

export const rightSidePanelSlice = createSlice({
  name: 'rightSidePanel',
  initialState,
  reducers: {
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
  setComponentOfRightSidePanelVisibilities,
  updateComponentOfRightSidePanelVisibilities,
} = rightSidePanelSlice.actions;

export const selectComponentOfRightSidePanelVisibilities = (state: RootState) =>
  state.rightSidePanel.componentOfRightSidePanelVisibilities;

export default rightSidePanelSlice.reducer;
