import { combineReducers } from 'redux';
import mouseReducer from './mouseSlice';
import componentAppearancesReducer from './componentAppearancesSlice';
import componentVisibilitiesReducer from './componentVisibilitiesSlice';
import hoveredComponentReducer from './hoveredComponentSlice';

export const rootReducer = combineReducers({
  mouse: mouseReducer,
  componentAppearances: componentAppearancesReducer,
  componentVisibilities: componentVisibilitiesReducer,
  hoveredComponent: hoveredComponentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
