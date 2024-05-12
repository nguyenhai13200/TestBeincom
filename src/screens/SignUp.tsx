import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import CheckCharactersPassword from 'src/components/CheckCharactersPassword';
import {
  checkDigitPassword,
  checkLengthPassword,
  checkLowerCasePassword,
  checkNoSpaceWhitePassword,
  checkSpecialCharacterPassword,
  checkUpperCasePassword,
} from 'src/helpers/validatePassword';
import firestore from '@react-native-firebase/firestore';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {validateEmail} from 'src/helpers/validateEmail';
import uuid from 'react-native-uuid';
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from 'src/utils/toastMessage';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export type TFormSignUpValue = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};
const initialValues: TFormSignUpValue = {
  email: '',
  fullName: '',
  username: '',
  password: '',
};

const getValidateSchema = () => {
  return Yup.object().shape({
    email: Yup.string()
      .required('Email is required!')
      .test('is-valid-email', 'Invalid email', value => validateEmail(value)),
    fullName: Yup.string().required('Full name is required!'),
    username: Yup.string().required('Username is required!'),
    password: Yup.string()
      .required('Password is required!')
      .test(
        'is-valid-password',
        'Invalid password',
        value =>
          checkLengthPassword(value) &&
          checkUpperCasePassword(value) &&
          checkLowerCasePassword(value) &&
          checkDigitPassword(value) &&
          checkSpecialCharacterPassword(value) &&
          checkNoSpaceWhitePassword(value),
      ),
  });
};

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {top} = useSafeAreaInsets();
  const offset = useSharedValue<number>(0);
  const scale = useSharedValue<number>(80);
  const logoLayoutX = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
    width: scale.value,
    height: scale.value,
  }));

  const handleKeyboardShow = useCallback(() => {
    offset.value = withTiming(-(logoLayoutX.value + 10), {duration: 400});
    scale.value = withTiming(60, {duration: 400});
  }, [offset, logoLayoutX.value, scale]);

  const handleKeyboardHide = useCallback(() => {
    offset.value = withTiming(0, {duration: 400});
    scale.value = withTiming(80, {duration: 400});
  }, [offset, scale]);

  const handleLayoutLogo = ({nativeEvent}: LayoutChangeEvent) => {
    logoLayoutX.value = nativeEvent.layout.x;
  };

  const handleSignUp = useCallback(
    async (
      value: TFormSignUpValue,
      formikHelpers: FormikHelpers<TFormSignUpValue>,
    ) => {
      try {
        const userId = uuid.v4();
        navigation.dispatch(StackActions.push(ERootStack.LoadingModal));
        const checkUserExist = await firestore()
          .collection('users')
          .where(
            firestore.Filter.or(
              firestore.Filter('email', '==', value.email),
              firestore.Filter('username', '==', value.username),
            ),
          )
          .get();
        if (checkUserExist.docs.length > 0) {
          navigation.dispatch(StackActions.pop());
          showErrorToastMessage('Email or User name is already taken.');
        } else {
          firestore()
            .collection('users')
            .doc(userId + '')
            .set({id: userId, ...value})
            .then(() => {
              navigation.dispatch(StackActions.pop());
              formikHelpers.resetForm();
              showSuccessToastMessage('Account successfully created!');
              navigation.dispatch(CommonActions.navigate(ERootStack.Login));
            })
            .catch(() => {
              navigation.dispatch(StackActions.pop());
              showErrorToastMessage('Account creation failed!');
            });
        }
      } catch (error) {
        console.log('SignUp error:', error);
      }
    },
    [navigation],
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.flexGrow}
      onKeyboardDidHide={handleKeyboardHide}
      onKeyboardDidShow={handleKeyboardShow}>
      <View style={[styles.container, {paddingTop: top}]}>
        <View style={styles.boxLogo}>
          <AnimatedImage
            onLayout={handleLayoutLogo}
            source={require('src/media/images/Logo.png')}
            style={[styles.logo, animatedStyles]}
          />
        </View>
        <Text style={styles.title}>Welcome!</Text>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidateSchema}
          onSubmit={handleSignUp}>
          {({
            setFieldValue,
            setFieldTouched,
            touched,
            handleSubmit,
            values,
            errors,
          }) => {
            const isFillAll =
              !!values.email &&
              !!values.fullName &&
              !!values.password &&
              !!values.username;
            return (
              <>
                <TextInputTitleAbove
                  type="input"
                  containerStyle={styles.containerTextInput}
                  style={styles.textInput}
                  title="Email"
                  value={values.email}
                  placeholder="Your email"
                  onChangeText={text => {
                    setFieldTouched('email', true);
                    setFieldValue('email', text, true);
                  }}
                  error={touched.email ? errors.email : ''}
                />
                <TextInputTitleAbove
                  type="input"
                  containerStyle={styles.containerTextInput}
                  style={styles.textInput}
                  title="Full name"
                  value={values.fullName}
                  onChangeText={text => {
                    setFieldTouched('fullName', true);
                    setFieldValue('fullName', text, true);
                  }}
                  placeholder="Your full name"
                  error={touched.fullName ? errors.fullName : ''}
                />
                <TextInputTitleAbove
                  type="input"
                  containerStyle={styles.containerTextInput}
                  style={styles.textInput}
                  title="Username"
                  value={values.username}
                  onChangeText={text => {
                    setFieldTouched('username', true);
                    setFieldValue('username', text, true);
                  }}
                  error={touched.username ? errors.username : ''}
                  placeholder="Your username"
                />
                <Text style={styles.mt10}>
                  You can not change your username after success creating
                  account.
                </Text>
                <TextInputTitleAbove
                  type="password"
                  style={styles.textInput}
                  containerStyle={styles.containerTextInput}
                  title="Password"
                  value={values.password}
                  onChangeText={text => setFieldValue('password', text, true)}
                  placeholder="Your password"
                />
                <CheckCharactersPassword
                  title="At least 8-20 characters"
                  isActive={checkLengthPassword(values.password)}
                />
                <CheckCharactersPassword
                  title="At least 01 upper case letter (A-Z)"
                  isActive={checkUpperCasePassword(values.password)}
                />
                <CheckCharactersPassword
                  title="At least 01 lower case letter (a-z)"
                  isActive={checkLowerCasePassword(values.password)}
                />
                <CheckCharactersPassword
                  title="At least 01 digit (0-9)"
                  isActive={checkDigitPassword(values.password)}
                />
                <CheckCharactersPassword
                  title="At least 01 special character (!@#$...)"
                  isActive={checkSpecialCharacterPassword(values.password)}
                />
                <CheckCharactersPassword
                  title="First and last characters don't contain whitespace"
                  isActive={checkNoSpaceWhitePassword(values.password)}
                />

                <TouchableOpacity
                  disabled={!isFillAll || Object.keys(errors).length !== 0}
                  style={[
                    styles.btnLogin,
                    {
                      backgroundColor:
                        isFillAll && Object.keys(errors).length === 0
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
                      {
                        color:
                          isFillAll && Object.keys(errors).length === 0
                            ? EColor.white
                            : EColor.color_666666,
                      },
                    ]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
        <View style={styles.boxTextSignUp}>
          <Text style={styles.textSignUp}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(CommonActions.navigate(ERootStack.Login))
            }>
            <Text style={[styles.textSignUp, {color: EColor.blue}]}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxTextLoginOther}>
          <View style={styles.line} />
          <Text style={styles.textLoginOther}>or log in with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.boxBtnOther}>
          <ButtonIconLoginOther icon={<IconFacebook />} style={styles.mr10} />
          <ButtonIconLoginOther icon={<IconGoogle />} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

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
    marginTop: rh(60),
  },
  textLoginOther: {
    marginHorizontal: rh(8),
  },
  mr10: {marginRight: rw(15)},
  boxBtnOther: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: rh(20),
    marginBottom: rh(50),
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
  mt10: {marginTop: rh(10)},
});
