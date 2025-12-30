import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ActivityIndicatorState {
  rootLoader: boolean;
  rootLoaderTitle: string;
}

const initialState: ActivityIndicatorState = {
  rootLoader: false,
  rootLoaderTitle: '',
};

const activityIndicatorSlice = createSlice({
  name: 'activityIndicator',
  initialState,
  reducers: {
    showActivityIndicator: (state, action: PayloadAction<string>) => {
      state.rootLoader = true;
      state.rootLoaderTitle = action.payload;
    },
    hideActivityIndicator: state => {
      state.rootLoader = false;
      state.rootLoaderTitle = '';
    },
  },
});

const { showActivityIndicator, hideActivityIndicator } =
  activityIndicatorSlice.actions;

// Action creator for loader
export const rootLoader = (show: boolean, text: string = '') => {
  return show ? showActivityIndicator(text) : hideActivityIndicator();
};

export default activityIndicatorSlice.reducer;
