import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import InputAddTodo from './InputAddTodo';
import ButtonPickDateTime from './ButtonPickDateTime';
import IconClose from 'src/media/icons/IconClose';
import {Formik, FormikHelpers} from 'formik';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from 'src/utils/toastMessage';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {RootReduxState} from 'src/redux/store';
import {addTodo} from 'src/redux/reducers/todoSlice';

export enum ETodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELED = 'CANCELED',
  DONE = 'DONE',
}

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
export type TFormTodoValue = {
  title: string;
  description: string;
  status?: ETodoStatus;
  ownerId?: string;
  timeStart: string;
  timeEnd: string;
};

const initialValues: TFormTodoValue = {
  title: '',
  description: '',
  status: ETodoStatus.OPEN,
  timeStart: moment().format(),
  timeEnd: moment().format(),
};
const ModalAddTodo = (props: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReduxState) => state.auth);
  const handleAddTodo = (
    value: TFormTodoValue,
    formikHelpers: FormikHelpers<TFormTodoValue>,
  ) => {
    const todoId = uuid.v4().toString();
    firestore()
      .collection('todos')
      .doc(todoId)
      .set({
        ...value,
        id: todoId,
        ownerId: user.id,
        timeStart: firestore.Timestamp.fromDate(new Date(value.timeStart)),
        timeEnd: firestore.Timestamp.fromDate(new Date(value.timeEnd)),
      })
      .then(() => {
        formikHelpers.resetForm();
        dispatch(addTodo({...value, id: todoId, ownerId: user.id}));
        showSuccessToastMessage('Todo successfully created!');
      })
      .catch(() => {
        showErrorToastMessage('Todo creation failed!');
      });
  };
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      isVisible={props.isVisible}
      style={styles.modal}>
      <View style={styles.container}>
        <Formik initialValues={initialValues} onSubmit={handleAddTodo}>
          {({setFieldValue, handleSubmit, values}) => {
            return (
              <>
                <View style={styles.boxBtnClose}>
                  <TouchableOpacity onPress={props.onClose}>
                    <IconClose />
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Add Todo</Text>
                <InputAddTodo
                  value={values.title}
                  title="Title todo:"
                  placeholder="Enter title todo..."
                  containerStyle={styles.input}
                  onChangeText={text => setFieldValue('title', text)}
                />
                <InputAddTodo
                  value={values.description}
                  title="Description todo:"
                  placeholder="Enter description todo..."
                  containerStyle={styles.input}
                  onChangeText={text => setFieldValue('description', text)}
                />
                <View style={[styles.boxTime, {marginTop: rh(30)}]}>
                  <Text style={styles.textTime}>Time start:</Text>
                  <ButtonPickDateTime
                    color={EColor.color_43A3FF}
                    onChangeDate={date => setFieldValue('timeStart', date)}
                  />
                </View>
                <View style={styles.boxTime}>
                  <Text style={styles.textTime}>Time end:</Text>
                  <ButtonPickDateTime
                    color={EColor.color_FF0B0B}
                    onChangeDate={date => setFieldValue('timeEnd', date)}
                  />
                </View>
                <View style={styles.boxBtn}>
                  <TouchableOpacity
                    onPress={props.onClose}
                    style={[
                      styles.btn,
                      {backgroundColor: EColor.color_FF0B0B},
                    ]}>
                    <Text style={styles.textBtn}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!values.title}
                    style={[
                      styles.btn,
                      {
                        backgroundColor: values.title
                          ? EColor.primary
                          : EColor.color_F4F4FF,
                      },
                    ]}
                    onPress={() => handleSubmit()}>
                    <Text
                      style={[
                        styles.textBtn,
                        {
                          color: values.title
                            ? EColor.white
                            : EColor.color_666666,
                        },
                      ]}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </Modal>
  );
};

export default ModalAddTodo;

const styles = StyleSheet.create({
  boxBtnClose: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    height: '80%',
    borderTopRightRadius: rh(20),
    borderTopLeftRadius: rh(20),
    backgroundColor: EColor.white,
    padding: rh(16),
  },
  title: {
    color: EColor.black,
    alignSelf: 'center',
    fontSize: rh(18),
    fontWeight: 'bold',
  },
  input: {
    marginTop: rh(15),
  },
  boxTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: rh(20),
  },
  textTime: {
    width: rw(100),
    color: EColor.black,
  },
  btn: {
    paddingVertical: rh(10),
    width: rw(120),
    backgroundColor: EColor.primary,
    alignItems: 'center',
    borderRadius: rh(10),
  },
  boxBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: rh(50),
  },
  textBtn: {
    color: EColor.white,
    fontSize: rh(16),
    fontWeight: 'bold',
  },
});
