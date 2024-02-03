import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { componentGroupList, componentNameList } from '../../data/common';
import {
  Appearance,
  ComponentName,
  PartialComponentAppearances,
} from '../../types/data/common';
import {
  generateInitialComponentAppearances,
  getParentComponentNameOfComponentElement,
} from '../../utils';
import { RootState } from '.';

export type ComponentAppearancesState = PartialComponentAppearances;

const initialState: ComponentAppearancesState =
  generateInitialComponentAppearances(componentNameList, componentGroupList);

export const componentAppearancesSlice = createSlice({
  name: 'componentAppearances',
  initialState,
  reducers: {
    setComponentAppearances: (
      state,
      action: PayloadAction<ComponentAppearancesState>
    ) => {
      return action.payload;
    },
    updateComponentAppearances: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSpecificComponentAppearance: (
      state,
      action: PayloadAction<{
        componentName: ComponentName;
        appearance: Appearance;
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
            [action.payload.componentName]: action.payload.appearance,
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

export const {
  setComponentAppearances,
  updateComponentAppearances,
  updateSpecificComponentAppearance,
} = componentAppearancesSlice.actions;

export const selectComponentAppearances = (state: RootState) =>
  state.componentAppearances;

export default componentAppearancesSlice.reducer;
