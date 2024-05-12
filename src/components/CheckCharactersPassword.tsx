import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import IconCheckCircle from 'src/media/icons/IconCheckCircle';
import {rh, rw} from 'src/helpers/responsive';
import {EColor} from 'src/enums/colors';

type Props = {
  title: string;
  isActive: boolean;
};

const CheckCharactersPassword = (props: Props) => {
  return (
    <View style={styles.container}>
      <IconCheckCircle
        width={rh(14)}
        height={rh(14)}
        style={[
          styles.icon,
          {marginTop: Platform.OS === 'android' ? rh(4) : rh(1.5)},
        ]}
        color={props.isActive ? EColor.color_0EB05C : EColor.color_666666}
      />
      <Text
        style={[
          styles.title,
          {color: props.isActive ? EColor.black : EColor.color_666666},
        ]}>
        {props.title}
      </Text>
    </View>
  );
};

export default memo(CheckCharactersPassword);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: rh(8),
  },
  icon: {
    marginTop: rh(1.5),
  },
  title: {
    marginLeft: rw(5),
    color: EColor.color_666666,
  },
});
