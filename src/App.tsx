import React from 'react';
import { CurrentUserProvider } from './context/currentUser';
import MainScreen from './screens/MainScreen';



function App() {
  return (
    <CurrentUserProvider>
      <MainScreen />
    </CurrentUserProvider>
  );
}

export default App;
