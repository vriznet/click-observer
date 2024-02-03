import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { componentGroupList, componentNameList } from '../../data/common';
import {
  ComponentName,
  PartialComponentVisibilities,
} from '../../types/data/common';
import {
  generateInitialComponentVisibilities,
  getParentComponentNameOfComponentElement,
} from '../../utils';
import { RootState } from '.';

export type ComponentVisibilitiesState = PartialComponentVisibilities;

const initialState: ComponentVisibilitiesState =
  generateInitialComponentVisibilities(componentNameList, componentGroupList);

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
