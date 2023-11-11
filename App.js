import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import GlobalState from './src/contextGlobal/GlobalState';

const App = () => {
  return (
    <GlobalState>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    </GlobalState>
  );
};

export default App;
