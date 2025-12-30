import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['ui', 'auth'], // Persist UI state and auth state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development only
});

// Create the persistor
export const persistor = persistStore(store);

// Export store types for use in hooks
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
