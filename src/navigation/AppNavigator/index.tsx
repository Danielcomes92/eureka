import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../../components/screens/MainScreen';
import TakePictureScreen from '../../components/screens/TakePictureScreen';
import PictureScreen from '../../components/screens/PictureScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{title: 'PiktApp'}}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TakePicture"
        component={TakePictureScreen}
      />
      <Stack.Screen
        options={{headerShown: false, gestureEnabled: false}}
        name="Picture"
        component={PictureScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
