import { combineReducers, UnknownAction } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/uiSlice';
import authReducer from '../features/auth/authSlice';

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const rootReducerWithReset = (
  state: RootState | undefined,
  action: UnknownAction,
) => {
  return rootReducer(state, action);
};

export default rootReducerWithReset;
