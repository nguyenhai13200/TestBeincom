import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import {RootStackParams} from './params';
import {ERootStack} from 'src/enums/navigation';
import Splash from 'src/screens/Splash';
import Login from 'src/screens/Login';
import LoadingModal from 'src/screens/LoadingModal';
import SignUp from 'src/screens/SignUp';

const Stack = createStackNavigator<RootStackParams>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={ERootStack.Splash}>
      <Stack.Screen name={ERootStack.Main} component={BottomTabNavigation} />
      <Stack.Screen name={ERootStack.Splash} component={Splash} />
      <Stack.Screen name={ERootStack.Login} component={Login} />
      <Stack.Screen name={ERootStack.SignUp} component={SignUp} />
      <Stack.Screen
        name={ERootStack.LoadingModal}
        component={LoadingModal}
        options={{headerShown: false, presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
