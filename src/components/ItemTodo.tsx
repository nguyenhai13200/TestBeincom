import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import IconProgress from 'src/media/icons/IconProgress';
import moment from 'moment';
import IconClock from 'src/media/icons/IconClock';
import {ETodoStatus, TFormTodoValue} from './ModalAddTodo';
import {getColorStatus} from 'src/helpers/getColorStatus';
import IconDone from 'src/media/icons/IconDone';
import IconOpen from 'src/media/icons/IconOpen';
import IconCancel from 'src/media/icons/IconCancel';

export interface Todo extends TFormTodoValue {
  id: string;
}

type Props = {
  todo: Todo;
  onPress?: () => void;
};

const ItemTodo = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text numberOfLines={2} style={styles.title}>
        {props.todo.title}
      </Text>
      <Text numberOfLines={2} style={styles.desc}>
        {props.todo.description}
      </Text>
      <View style={styles.containerStatus}>
        <View style={styles.boxStatus}>
          {props.todo.status === ETodoStatus.IN_PROGRESS && (
            <IconProgress
              height={rh(18)}
              width={rh(18)}
              color={getColorStatus(ETodoStatus.IN_PROGRESS)}
            />
          )}
          {props.todo.status === ETodoStatus.DONE && (
            <IconDone
              height={rh(18)}
              width={rh(18)}
              color={getColorStatus(ETodoStatus.DONE)}
            />
          )}
          {props.todo.status === ETodoStatus.OPEN && (
            <IconOpen
              height={rh(18)}
              width={rh(18)}
              color={getColorStatus(ETodoStatus.OPEN)}
            />
          )}
          {props.todo.status === ETodoStatus.CANCELED && (
            <IconCancel
              height={rh(18)}
              width={rh(18)}
              color={getColorStatus(ETodoStatus.CANCELED)}
            />
          )}
          <Text
            style={[
              styles.textStatus,
              {
                color: props.todo.status
                  ? getColorStatus(props.todo.status)
                  : getColorStatus(),
              },
            ]}>
            {props.todo.status}
          </Text>
        </View>
        <View>
          <View style={styles.boxTime}>
            <IconClock
              height={rh(14)}
              width={rh(14)}
              color={EColor.color_43A3FF}
            />
            <Text style={styles.timeStart}>
              {moment(props.todo.timeStart).format('HH:mm DD/MM/YYYY')}
            </Text>
          </View>
          <View style={[styles.boxTime, {marginTop: rh(3)}]}>
            <IconClock
              height={rh(14)}
              width={rh(14)}
              color={EColor.color_FF0B0B}
            />
            <Text style={styles.timeEnd}>
              {moment(props.todo.timeEnd).format('HH:mm DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ItemTodo);

const styles = StyleSheet.create({
  container: {
    backgroundColor: EColor.white,
    borderRadius: rh(10),
    padding: rh(14),
  },
  title: {
    color: EColor.black,
    fontSize: rh(16),
    fontWeight: 'bold',
  },
  desc: {
    color: EColor.color_666666,
    marginTop: rh(5),
    fontSize: rh(13),
  },
  containerStatus: {
    flexDirection: 'row',
    marginTop: rh(10),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  boxStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStatus: {
    color: EColor.orange,
    fontWeight: '500',
    marginLeft: rw(5),
  },
  boxTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStart: {
    color: EColor.color_43A3FF,
    fontSize: rh(13),
    marginLeft: rw(5),
  },
  timeEnd: {
    color: EColor.color_FF0B0B,
    fontSize: rh(13),
    marginLeft: rw(5),
  },
});
