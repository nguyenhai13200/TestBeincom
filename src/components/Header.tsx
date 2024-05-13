import {Image, StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import {rh} from 'src/helpers/responsive';
import {EColor} from 'src/enums/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = () => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <Image
        source={require('src/media/images/Logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.white,
  },
  logo: {
    width: rh(70),
    height: rh(70),
    marginLeft: rh(40),
  },
});
