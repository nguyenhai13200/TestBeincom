import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from 'src/redux/store';

type Props = {
  children: JSX.Element;
};
const AppProvider = ({children}: Props) => {
  return (
    <Provider store={store}>
      <NavigationContainer>{children}</NavigationContainer>
    </Provider>
  );
};

export default AppProvider;
