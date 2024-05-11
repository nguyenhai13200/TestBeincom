import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {rh, rw} from 'src/helpers/responsive';
import {EColor} from 'src/enums/colors';
import IconClose from 'src/media/icons/IconClose';
import IconEyeOff from 'src/media/icons/IconEyeOff';
import IconEyeOn from 'src/media/icons/IconEyeOn';

type Props = {
  containerStyle: StyleProp<ViewStyle>;
  title?: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  type: 'input' | 'password';
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
};

const TextInputTitleAbove = (props: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [focus, setFocus] = useState(false);

  const handleRemoveText = useCallback(() => {
    props.onChangeText && props.onChangeText('');
  }, [props]);

  const handleOnOrOffPassword = useCallback(() => {
    setShowPass(prev => !prev);
  }, []);

  const handleFocus = useCallback(() => {
    setFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, []);

  const handleChangeText = useCallback(
    (txt: string) => {
      props.onChangeText && props.onChangeText(txt);
    },
    [props],
  );
  return (
    <View style={props.containerStyle}>
      <Text style={styles.title}>{props.title || 'Title'}</Text>
      <View
        style={[
          styles.boxTextInput,
          {borderColor: focus ? EColor.primary : EColor.color_cccccc},
        ]}>
        <TextInput
          autoCapitalize="none"
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={EColor.color_666666}
          style={[styles.flex, styles.pd0, props.style]}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={props.type === 'password' ? !showPass : false}
        />
        {props.value && props.type === 'input' && (
          <TouchableOpacity onPress={handleRemoveText}>
            <IconClose width={rh(18)} height={rh(18)} />
          </TouchableOpacity>
        )}
        {props.type === 'password' && (
          <TouchableOpacity onPress={handleOnOrOffPassword}>
            {!showPass ? (
              <IconEyeOff height={rh(18)} width={rh(18)} />
            ) : (
              <IconEyeOn height={rh(18)} width={rh(18)} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {props.error && <Text style={styles.textError}>{props.error}</Text>}
    </View>
  );
};

export default memo(TextInputTitleAbove);

const styles = StyleSheet.create({
  flex: {flex: 1},
  title: {
    fontSize: rh(16),
    color: EColor.black,
  },
  boxTextInput: {
    flexDirection: 'row',
    borderWidth: rh(1),
    borderColor: EColor.color_cccccc,
    borderRadius: rh(5),
    paddingVertical: rh(10),
    paddingHorizontal: rw(16),
    marginTop: rh(8),
    alignItems: 'center',
  },
  pd0: {padding: 0},
  textError: {
    color: EColor.color_FF0B0B,
    marginTop: rh(3),
  },
});
