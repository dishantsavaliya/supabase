import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
