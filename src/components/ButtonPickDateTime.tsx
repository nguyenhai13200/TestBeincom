import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import IconClock from 'src/media/icons/IconClock';
import {rh, rw} from 'src/helpers/responsive';
import {EColor} from 'src/enums/colors';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type Props = {
  color?: string;
  onPress?: () => void;
  onChangeDate?: React.Dispatch<React.SetStateAction<string>>;
};

const ButtonPickDateTime = (props: Props) => {
  const [dateSelect, setDateSelect] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity style={styles.container} onPress={() => setOpen(true)}>
      <IconClock height={rh(16)} width={rh(16)} color={props.color} />
      <Text style={[styles.text, {color: props.color || EColor.black}]}>
        {moment(dateSelect).format('HH:mm DD/MM/YYYY')}
      </Text>
      <DatePicker
        modal
        open={open}
        date={dateSelect || new Date()}
        mode="datetime"
        minimumDate={new Date()}
        onConfirm={(date: Date) => {
          setOpen(false);
          setDateSelect(date);
          props.onChangeDate && props.onChangeDate(moment(date).format());
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(ButtonPickDateTime);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: rw(5),
  },
});
