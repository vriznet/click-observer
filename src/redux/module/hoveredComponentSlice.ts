import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ComponentOfLeftSidePanelName,
  ComponentOfRightSidePanelName,
  ComponentOfScreenName,
} from '../../types/data/componentName';
import { ComponentName } from '../../types/data/componentName';
import { RootState } from '.';

export interface HoveredComponentState {
  Screen: ComponentOfScreenName | 'ScreenBoundary';
  LeftSidePanel:
    | ComponentOfLeftSidePanelName
    | 'notHovered'
    | 'LeftSidePanelBoundary';
  RightSidePanel:
    | ComponentOfRightSidePanelName
    | 'notHovered'
    | 'RightSidePanelBoundary';
}

const initialState: HoveredComponentState = {
  Screen: 'ScreenBoundary',
  LeftSidePanel: 'notHovered',
  RightSidePanel: 'notHovered',
};

export const hoveredComponentSlice = createSlice({
  name: 'hoveredComponent',
  initialState,
  reducers: {
    setHoveredComponent: (
      state,
      action: PayloadAction<{
        componentName: ComponentName;
        hoveredChildComponentName: ComponentName | 'notHovered' | string;
      }>
    ) => {
      return {
        ...state,
        [action.payload.componentName]:
          action.payload.hoveredChildComponentName,
      };
    },
  },
});

export const { setHoveredComponent } = hoveredComponentSlice.actions;

export const selectHoveredComponent = (state: RootState) =>
  state.hoveredComponent;

export default hoveredComponentSlice.reducer;
