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
import {EProviderId, setAuth} from 'src/redux/reducers/authSlice';
import {convertStringToUsername} from 'src/helpers/convertString';
import {Profile} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Splash = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const getUser = async () => {
    const auth = await AsyncStorage.getItem(EStorageState.Auth);
    if (auth) {
      try {
        const {
          email: emailStorage,
          password: passwordStorage,
          providerId: providerIdStorage,
        } = JSON.parse(auth);

        if (providerIdStorage === EProviderId.Email) {
          const checkUserExist = await firestore()
            .collection('users')
            .where('email', '==', emailStorage)
            .where('password', '==', passwordStorage)
            .get();
          if (checkUserExist.docs.length > 0) {
            const {id, email, username, fullName, avatar, providerId} =
              checkUserExist.docs[0].data();

            dispatch(
              setAuth({id, email, username, fullName, avatar, providerId}),
            );

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ERootStack.Main}],
              }),
            );
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ERootStack.Login}],
              }),
            );
          }
        } else if (providerIdStorage === EProviderId.Facebook) {
          const user = await Profile.getCurrentProfile();
          if (user) {
            const {
              userID: id,
              email,
              name: fullName,
              imageURL: avatar,
            } = user as any;

            dispatch(
              setAuth({
                id,
                email,
                username: convertStringToUsername(fullName),
                fullName,
                avatar,
                providerId: EProviderId.Facebook,
              }),
            );
            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: ERootStack.Main}],
                }),
              );
            }, 500);
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ERootStack.Login}],
              }),
            );
          }
        } else {
          const resUserGoogle = await GoogleSignin.getCurrentUser();
          if (resUserGoogle) {
            const {
              id,
              email,
              name: fullName,
              photo: avatar,
            } = resUserGoogle.user as any;
            dispatch(
              setAuth({
                id,
                email,
                username: convertStringToUsername(fullName),
                fullName,
                avatar,
                providerId: EProviderId.Google,
              }),
            );
            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: ERootStack.Main}],
                }),
              );
            }, 500);
          } else {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ERootStack.Login}],
              }),
            );
          }
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
      }, 500);
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
