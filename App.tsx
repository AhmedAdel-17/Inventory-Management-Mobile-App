// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { AlertProvider } from './src/components/CustomAlert';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AlertProvider>
        <AppNavigator />
      </AlertProvider>
    </Provider>
  );
};

export default App;