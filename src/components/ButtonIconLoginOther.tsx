import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import {rh} from 'src/helpers/responsive';
import {EColor} from 'src/enums/colors';

type Props = {
  icon: JSX.Element;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const ButtonIconLoginOther = (props: Props) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.container, props.style]}>
        {props.icon}
      </TouchableOpacity>
    </View>
  );
};

export default memo(ButtonIconLoginOther);

const styles = StyleSheet.create({
  container: {
    borderWidth: rh(1),
    borderColor: EColor.color_cccccc,
    padding: rh(10),
    borderRadius: rh(100),
  },
  row: {
    flexDirection: 'row',
  },
});
