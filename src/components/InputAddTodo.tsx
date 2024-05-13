import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {EColor} from 'src/enums/colors';
import {rh} from 'src/helpers/responsive';
import {TextInput} from 'react-native-gesture-handler';

type Props = {
  title: string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  value?: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
};

const InputAddTodo = (props: Props) => {
  return (
    <View style={props.containerStyle}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.boxInput}>
        <TextInput
          value={props.value}
          placeholder={props.placeholder || 'Enter title todo...'}
          placeholderTextColor={EColor.color_cccccc}
          multiline
          style={styles.input}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};

export default InputAddTodo;

const styles = StyleSheet.create({
  title: {
    color: EColor.black,
    fontSize: rh(15),
    fontWeight: '500',
  },
  boxInput: {
    borderWidth: rh(1),
    borderColor: EColor.color_666666,
    padding: rh(10),
    borderRadius: rh(10),
    marginTop: rh(10),
  },
  input: {
    height: rh(100),
    color: EColor.black,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});
