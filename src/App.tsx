import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from './components/screens/SplashScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2400);
  }, []);

  return (
    <NavigationContainer>
      {showSplash ? <SplashScreen /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default App;
