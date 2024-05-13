import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import InputAddTodo from './InputAddTodo';
import ButtonPickDateTime from './ButtonPickDateTime';
import IconClose from 'src/media/icons/IconClose';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import {
  showSuccessToastMessage,
  showErrorToastMessage,
} from 'src/utils/toastMessage';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootReduxState} from 'src/redux/store';
import IconEdit from 'src/media/icons/IconEdit';
import IconRemove from 'src/media/icons/IconRemove';
import {Todo} from './ItemTodo';
import DropdownStatus from './DropdownStatus';
import {ETodoStatus} from './ModalAddTodo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const ModalTodoDetail = (props: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const {top} = useSafeAreaInsets();

  const {todoDetail} = useSelector((state: RootReduxState) => state.todos);

  const onSubmit = (value: Todo) => {
    firestore()
      .collection('todos')
      .doc(todoDetail.id)
      .update({
        ...value,
        timeStart: firestore.Timestamp.fromDate(
          new Date(
            `${moment(value.date)
              .format('DD/MM/YYYY')!
              .split('/')
              .reverse()
              .join('-')}T${moment(new Date(value.timeStart)).format('HH:mm')}`,
          ),
        ),
        timeEnd: firestore.Timestamp.fromDate(
          new Date(
            `${moment(value.date)
              .format('DD/MM/YYYY')!
              .split('/')
              .reverse()
              .join('-')}T${moment(new Date(value.timeEnd)).format('HH:mm')}`,
          ),
        ),
      })
      .then(() => {
        setIsEdit(false);
        showSuccessToastMessage('Edit todo successfully!');
      })
      .catch(() => {
        showErrorToastMessage('Edit todo failed!');
      });
  };

  const handleRemove = () => {
    firestore()
      .collection('todos')
      .doc(todoDetail.id)
      .delete()
      .then(() => {
        setIsRemove(false);
        props.onClose();
        showSuccessToastMessage('Todo deleted!');
      })
      .catch(() => {
        showErrorToastMessage('Delete todo error!');
      });
  };

  const handleChangeStatus = (status: ETodoStatus) => {
    firestore()
      .collection('todos')
      .doc(todoDetail.id)
      .update({
        status,
      })
      .then(() => {
        setIsEdit(false);
        showSuccessToastMessage('Change status todo successfully!');
      })
      .catch(() => {
        showErrorToastMessage('Change status todo failed!');
      });
  };
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      isVisible={props.isVisible}
      style={styles.modal}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.flexGrow, {marginTop: top + rh(50)}]}>
        <View style={styles.container}>
          <Formik initialValues={todoDetail} onSubmit={onSubmit}>
            {({setFieldValue, handleSubmit, values, resetForm}) => {
              return (
                <>
                  <View style={styles.boxBtnClose}>
                    <View style={styles.boxEdit}>
                      <TouchableOpacity
                        style={styles.mR10}
                        onPress={() => setIsEdit(true)}>
                        <IconEdit width={rh(21)} height={rh(21)} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setIsRemove(true)}>
                        <IconRemove
                          width={rh(21)}
                          height={rh(21)}
                          color={EColor.color_FF0B0B}
                        />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={props.onClose}>
                      <IconClose />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.title}>Todo Detail</Text>
                  <DropdownStatus onPress={handleChangeStatus} />
                  <InputAddTodo
                    editable={isEdit}
                    value={values.title}
                    title="Title todo:"
                    placeholder="Enter title todo..."
                    containerStyle={styles.input}
                    onChangeText={text => setFieldValue('title', text)}
                  />
                  <InputAddTodo
                    editable={isEdit}
                    value={values.description}
                    title="Description todo:"
                    placeholder="Enter description todo..."
                    containerStyle={styles.input}
                    onChangeText={text => setFieldValue('description', text)}
                  />
                  <View style={[styles.boxTime, {marginTop: rh(30)}]}>
                    <Text style={styles.textTime}>Date:</Text>
                    <ButtonPickDateTime
                      value={new Date(values.date!)}
                      disabled
                      mode="date"
                      color={EColor.color_43A3FF}
                      onChangeDate={date => setFieldValue('date', date)}
                    />
                  </View>
                  <View style={styles.boxTime}>
                    <Text style={styles.textTime}>Time start:</Text>
                    <ButtonPickDateTime
                      value={new Date(values.timeStart)}
                      disabled
                      mode="time"
                      color={EColor.color_43A3FF}
                      onChangeDate={date => setFieldValue('timeStart', date)}
                    />
                  </View>
                  <View style={styles.boxTime}>
                    <Text style={styles.textTime}>Time end:</Text>
                    <ButtonPickDateTime
                      value={new Date(values.timeEnd)}
                      disabled
                      mode="time"
                      color={EColor.color_FF0B0B}
                      onChangeDate={date => setFieldValue('timeEnd', date)}
                    />
                  </View>

                  {isEdit && (
                    <View style={styles.boxBtn}>
                      <TouchableOpacity
                        onPress={() => {
                          resetForm();
                          setIsEdit(false);
                        }}
                        style={[
                          styles.btn,
                          {backgroundColor: EColor.color_FF0B0B},
                        ]}>
                        <Text style={styles.textBtn}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!values.title}
                        style={styles.btn}
                        onPress={() => handleSubmit()}>
                        <Text style={styles.textBtn}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {isRemove && (
                    <View style={styles.boxBtn}>
                      <TouchableOpacity
                        onPress={() => setIsRemove(false)}
                        style={[
                          styles.btn,
                          {backgroundColor: EColor.color_FF0B0B},
                        ]}>
                        <Text style={styles.textBtn}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!values.title}
                        style={styles.btn}
                        onPress={handleRemove}>
                        <Text style={styles.textBtn}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default ModalTodoDetail;

const styles = StyleSheet.create({
  flexGrow: {flexGrow: 1},
  boxEdit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxBtnClose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
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
  mR10: {
    marginRight: rw(10),
  },
});
