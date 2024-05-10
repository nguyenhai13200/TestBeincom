import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';

type Props = {
  children: JSX.Element;
};
const AppProvider = ({children}: Props) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default AppProvider;
