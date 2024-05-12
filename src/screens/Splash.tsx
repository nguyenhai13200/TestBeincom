import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {EColor} from 'src/enums/colors';
import {ERootStack} from 'src/enums/navigation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootStackParams} from 'src/navigation/params';
import {StackNavigationProp} from '@react-navigation/stack';
import {rh, rw} from 'src/helpers/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EStorageState} from 'src/enums/storage';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setAuth} from 'src/redux/reducers/authSlice';

const Splash = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const getUser = async () => {
    const auth = await AsyncStorage.getItem(EStorageState.Auth);
    if (auth) {
      try {
        const {email: emailStorage, password: passwordStorage} =
          JSON.parse(auth);

        const checkUserExist = await firestore()
          .collection('users')
          .where('email', '==', emailStorage)
          .where('password', '==', passwordStorage)
          .get();

        if (checkUserExist.docs.length > 0) {
          const {id, email, username, fullName} = checkUserExist.docs[0].data();

          dispatch(setAuth({id, email, username, fullName}));

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: ERootStack.Main}],
            }),
          );
        } else {
          navigation.dispatch(
            CommonActions.reset({index: 0, routes: [{name: ERootStack.Login}]}),
          );
        }
      } catch (error) {
        console.log('Login error:', error);
      }
    } else {
      setTimeout(() => {
        // Use sett to clean the warning log (Sending `onAnimatedValueUpdate` with no listeners registered.)
        navigation.dispatch(
          CommonActions.reset({index: 0, routes: [{name: ERootStack.Login}]}),
        );
      }, 1000);
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('src/media/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Powered by Abong</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: EColor.white,
    alignItems: 'center',
  },
  logo: {
    width: rw(200),
    height: rh(150),
    marginTop: rh(300),
  },
  text: {
    position: 'absolute',
    fontSize: rh(12),
    bottom: rh(100),
  },
});
