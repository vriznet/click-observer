import { combineReducers } from 'redux';
import mouseReducer from './mouseSlice';
import componentAppearancesReducer from './componentAppearancesSlice';
import componentVisibilitiesReducer from './componentVisibilitiesSlice';

export const rootReducer = combineReducers({
  mouse: mouseReducer,
  componentAppearances: componentAppearancesReducer,
  componentVisibilities: componentVisibilitiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
