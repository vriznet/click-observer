import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfLeftSidePanelName,
  ComponentOfLeftSidePanelVisibilities,
} from '../../types/data/leftSidePanel';
import { RootState } from '.';

export interface LeftSidePanelState {
  componentOfLeftSidePanelVisibilities: ComponentOfLeftSidePanelVisibilities;
}

const initialState: LeftSidePanelState = {
  componentOfLeftSidePanelVisibilities: {
    Red: false,
    Green: false,
  },
};

export const leftSidePanelSlice = createSlice({
  name: 'leftSidePanel',
  initialState,
  reducers: {
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
  setComponentOfLeftSidePanelVisibilities,
  updateComponentOfLeftSidePanelVisibilities,
} = leftSidePanelSlice.actions;

export const selectComponentOfLeftSidePanelVisibilities = (state: RootState) =>
  state.leftSidePanel.componentOfLeftSidePanelVisibilities;

export default leftSidePanelSlice.reducer;
