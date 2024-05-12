import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Todos from 'src/screens/Todos';
import {BottomTabParams} from './params';
import {EBottomTab} from 'src/enums/navigation';
import Today from 'src/screens/Today';
import Menu from 'src/screens/Menu';
import BottomTabBar from './components/BottomTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParams>();

const tabBarBottom = (props: BottomTabBarProps) => {
  return <BottomTabBar {...props} />;
};
const BottomTabNavigation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={tabBarBottom}>
      <BottomTab.Screen name={EBottomTab.Todos} component={Todos} />
      <BottomTab.Screen name={EBottomTab.Today} component={Today} />
      <BottomTab.Screen name={EBottomTab.Menu} component={Menu} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
