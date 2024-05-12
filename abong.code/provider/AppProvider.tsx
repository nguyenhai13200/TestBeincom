import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from 'src/redux/store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  iosClientId:
    '764760717435-cc8pk6rav7nv0l4nj785hsu3rm475293.apps.googleusercontent.com',
  webClientId:
    '764760717435-hj3l635970gdonggbsgj8vqm7ifblmmh.apps.googleusercontent.com',
});

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
