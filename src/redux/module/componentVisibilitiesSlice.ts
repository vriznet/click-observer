import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { componentGroupList } from '../../data/common';
import { PartialComponentVisibilities } from '../../types/data/common';
import { getParentComponentNameOfComponentElement } from '../../utils';
import { RootState } from '.';
import { ComponentName } from '../../types/data/componentName';

export type ComponentVisibilitiesState = PartialComponentVisibilities;

const initialState: ComponentVisibilitiesState = {
  Screen: {
    LeftSidePanel: true,
    RightSidePanel: true,
    ListContainer: true,
  },
  LeftSidePanel: {
    Red: true,
    Green: true,
  },
  RightSidePanel: {
    Blue: true,
    Black: true,
  },
};

export const componentVisibilitiesSlice = createSlice({
  name: 'componentVisibilities',
  initialState,
  reducers: {
    setComponentVisibilities: (
      state,
      action: PayloadAction<ComponentVisibilitiesState>
    ) => {
      return action.payload;
    },
    updateComponentVisibilities: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSpecificComponentVisibility: (
      state,
      action: PayloadAction<{
        componentName: ComponentName;
        visibility: boolean;
      }>
    ) => {
      const parentComponentName = getParentComponentNameOfComponentElement(
        componentGroupList,
        action.payload.componentName
      );
      if (parentComponentName) {
        return {
          ...state,
          [parentComponentName]: {
            ...state[parentComponentName],
            [action.payload.componentName]: action.payload.visibility,
          },
        };
      } else {
        return {
          ...state,
        };
      }
    },
  },
});

export const selectComponentVisibilities = (state: RootState) =>
  state.componentVisibilities;

export const {
  setComponentVisibilities,
  updateComponentVisibilities,
  updateSpecificComponentVisibility,
} = componentVisibilitiesSlice.actions;

export default componentVisibilitiesSlice.reducer;
