import { combineReducers } from 'redux';
import mouseReducer from './mouseSlice';
import screenReducer from './screenSlice';
import leftSidePanelReducer from './leftSidePanelSlice';
import rightSidePanelReducer from './rightSidePanelSlice';
import componentAppearancesReducer from './componentAppearancesSlice';

export const rootReducer = combineReducers({
  mouse: mouseReducer,
  screen: screenReducer,
  leftSidePanel: leftSidePanelReducer,
  rightSidePanel: rightSidePanelReducer,
  componentAppearances: componentAppearancesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
