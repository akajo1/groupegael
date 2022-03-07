import 'react-native-gesture-handler';
import React, {useContext,useState,useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScreensApp from './ScreensApp';

const Stack = createStackNavigator();




function Navigation(props) {
  
  return (
    <Stack.Navigator headerMode="none">
   <Stack.Screen name="screensapp" component={ScreensApp}/>
  </Stack.Navigator>
  );
}

export default Navigation;