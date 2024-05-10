import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import {RootStackParams} from './params';
import {ERootStack} from 'src/enums/navigation';
import Splash from 'src/screens/Splash';

const Stack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ERootStack.Splash}>
      <Stack.Screen name={ERootStack.Splash} component={Splash} />
      <Stack.Screen name={ERootStack.Main} component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
