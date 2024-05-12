import {
  Image,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback} from 'react';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputTitleAbove from 'src/components/TextInputTitleAbove';
import IconFacebook from 'src/media/icons/IconFacebook';
import IconGoogle from 'src/media/icons/IconGoogle';
import ButtonIconLoginOther from 'src/components/ButtonIconLoginOther';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from 'src/navigation/params';
import {ERootStack} from 'src/enums/navigation';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {validateEmail} from 'src/helpers/validateEmail';
import firestore from '@react-native-firebase/firestore';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from 'src/utils/toastMessage';
import {useDispatch} from 'react-redux';
import {setAuth} from 'src/redux/reducers/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EStorageState} from 'src/enums/storage';
import {LoginManager, Profile} from 'react-native-fbsdk-next';

const AnimatedImage = Animated.createAnimatedComponent(Image);

type TFormLoginValue = {
  email: string;
  password: string;
};

const initialValues = {
  email: '',
  password: '',
};

const getValidateSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .required('Email is required!')
      .test('is-valid-email', 'Invalid email', value => validateEmail(value)),
    password: Yup.string().required('Password is required!'),
  });
};

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const {top} = useSafeAreaInsets();
  const {height} = useWindowDimensions();
  const offset = useSharedValue<number>(0);
  const scale = useSharedValue<number>(80);
  const logoLayoutX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
    width: scale.value,
    height: scale.value,
  }));

  const handleKeyboardShow = useCallback(() => {
    offset.value = withTiming(
      -(logoLayoutX.value + (Platform.OS === 'android' ? 10 : 0)),
      {duration: 400},
    );
    scale.value = withTiming(60, {duration: 400});
  }, [offset, logoLayoutX.value, scale]);

  const handleKeyboardHide = useCallback(() => {
    offset.value = withTiming(0, {duration: 400});
    scale.value = withTiming(80, {duration: 400});
  }, [offset, scale]);

  const handleLayoutLogo = ({nativeEvent}: LayoutChangeEvent) => {
    logoLayoutX.value = nativeEvent.layout.x;
  };

  const handleLogin = useCallback(
    async (
      value: TFormLoginValue,
      formikHelpers: FormikHelpers<TFormLoginValue>,
    ) => {
      try {
        navigation.dispatch(StackActions.push(ERootStack.LoadingModal));
        const checkUserExist = await firestore()
          .collection('users')
          .where('email', '==', value.email)
          .where('password', '==', value.password)
          .get();
        if (checkUserExist.docs.length > 0) {
          const {id, email, username, fullName, password} =
            checkUserExist.docs[0].data();
          dispatch(setAuth({id, email, username, fullName}));
          await AsyncStorage.setItem(
            EStorageState.Auth,
            JSON.stringify({email, password}),
          );
          navigation.dispatch(StackActions.pop());
          showSuccessToastMessage('Login success');
          formikHelpers.resetForm();
          navigation.dispatch(StackActions.replace(ERootStack.Main));
        } else {
          navigation.dispatch(StackActions.pop());
          showErrorToastMessage('Error');
        }
      } catch (error) {
        console.log('Login error:', error);
      }
    },
    [dispatch, navigation],
  );

  const handleLoginFacebook = async () => {
    // Attempt login with permissions
    try {
      LoginManager.setLoginBehavior('native_only');
      const resultNative = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (resultNative.isCancelled) {
        showSuccessToastMessage('You cancelled login with Facebook');
      }
    } catch (nativeError) {
      console.log('Login FB native error:', nativeError);
      try {
        LoginManager.setLoginBehavior('web_only');
        const resultWeb = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        if (resultWeb.isCancelled) {
          showSuccessToastMessage('You cancelled login with Facebook');
        }
      } catch (webError) {
        console.log('Login FB web error:', webError);
      }
    }

    // // Once signed in, get the users AccesToken
    // const data = await AccessToken.getCurrentAccessToken();

    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }

    Profile.getCurrentProfile().then(function (currentProfile) {
      console.log(currentProfile);
    });
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}
      onKeyboardDidHide={handleKeyboardHide}
      onKeyboardDidShow={handleKeyboardShow}>
      <View style={[styles.container, {paddingTop: top, height}]}>
        <View style={styles.boxLogo}>
          <AnimatedImage
            onLayout={handleLayoutLogo}
            source={require('src/media/images/Logo.png')}
            style={[styles.logo, animatedStyles]}
          />
        </View>
        <Text style={styles.title}>Welcome back!</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidateSchema}
          onSubmit={handleLogin}>
          {({submitCount, setFieldValue, handleSubmit, values, errors}) => {
            const isFillAll = !!values.email && !!values.password;
            return (
              <>
                <TextInputTitleAbove
                  type="input"
                  containerStyle={styles.containerTextInput}
                  style={styles.textInput}
                  title="Email"
                  placeholder="Your email"
                  value={values.email}
                  onChangeText={text => setFieldValue('email', text, true)}
                  error={submitCount ? errors.email : ''}
                />
                <TextInputTitleAbove
                  type="password"
                  style={styles.textInput}
                  containerStyle={styles.containerTextInput}
                  title="Password"
                  placeholder="Your password"
                  value={values.password}
                  onChangeText={text => setFieldValue('password', text, true)}
                  error={submitCount ? errors.password : ''}
                />

                <View style={styles.btnForgotPass}>
                  <TouchableOpacity>
                    <Text style={styles.textForgotPass}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  disabled={!isFillAll}
                  style={[
                    styles.btnLogin,
                    {
                      backgroundColor: isFillAll
                        ? EColor.primary
                        : EColor.color_F4F4FF,
                    },
                  ]}
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <Text
                    style={[
                      styles.textBtnLogin,
                      {color: isFillAll ? EColor.white : EColor.color_666666},
                    ]}>
                    Log In
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
        <View style={styles.boxTextSignUp}>
          <Text style={styles.textSignUp}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(CommonActions.navigate(ERootStack.SignUp))
            }>
            <Text style={[styles.textSignUp, {color: EColor.blue}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxTextLoginOther}>
          <View style={styles.line} />
          <Text style={styles.textLoginOther}>or log in with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.boxBtnOther}>
          <TouchableOpacity style={styles.mr10}>
            <ButtonIconLoginOther
              icon={<IconFacebook />}
              onPress={handleLoginFacebook}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <ButtonIconLoginOther icon={<IconGoogle />} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxTextPolicy}>
          <Text style={styles.textPolicy}>
            By signing in to BIC group, you agree to
          </Text>
          <Text style={styles.textPrivacy}>Privacy & Terms</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  flexGrow: {flexGrow: 1},
  flex: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: EColor.white,
    paddingHorizontal: rw(20),
  },
  logo: {
    width: rw(80),
    height: rw(80),
    borderWidth: rh(1),
    borderRadius: rh(10),
    borderColor: EColor.color_cccccc,
  },
  boxLogo: {
    alignItems: 'center',
    marginTop: rh(50),
  },
  title: {
    fontSize: rh(22),
    fontWeight: '600',
    marginTop: rh(20),
    color: EColor.black,
  },
  containerTextInput: {
    marginTop: rh(18),
  },
  textInput: {
    fontSize: rh(14),
  },
  textForgotPass: {
    fontSize: rh(14),
    color: EColor.blue,
  },
  textSignUp: {
    fontSize: rh(14),
    color: EColor.black,
  },
  btnForgotPass: {
    flexDirection: 'row',
    marginTop: rh(20),
  },
  btnLogin: {
    backgroundColor: EColor.color_F4F4FF,
    alignItems: 'center',
    paddingVertical: rh(10),
    marginTop: rh(25),
    borderRadius: rh(5),
  },
  textBtnLogin: {
    fontSize: rh(18),
    color: EColor.color_666666,
  },
  boxTextSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(25),
  },
  line: {
    height: rh(1),
    flex: 1,
    width: 100,
    backgroundColor: EColor.color_cccccc,
  },
  boxTextLoginOther: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(30),
  },
  textLoginOther: {
    marginHorizontal: rh(8),
  },
  mr10: {marginRight: rw(15)},
  boxBtnOther: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(20),
  },
  textPolicy: {
    textAlign: 'center',
    color: EColor.color_666666,
  },
  textPrivacy: {
    color: EColor.blue,
  },
  boxTextPolicy: {
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: rh(50),
  },
});
