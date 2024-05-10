import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {EColor} from 'src/enums/colors';
import {ERootStack} from 'src/enums/navigation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RootStackParams} from 'src/navigation/params';
import {StackNavigationProp} from '@react-navigation/stack';
import {rh, rw} from 'src/helpers/responsive';

const Splash = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: ERootStack.Main}],
        }),
      );
    }, 2000);
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
