import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Header from 'src/components/Header';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootReduxState} from 'src/redux/store';
import ItemTodo, {Todo} from 'src/components/ItemTodo';
import {EColor} from 'src/enums/colors';
import {rw, rh} from 'src/helpers/responsive';
import ModalTodoDetail from 'src/components/ModalTodoDetail';

const Today = () => {
  const [listTodos, setListTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootReduxState) => state.auth);
  const now = moment().utcOffset(7);
  const startOfToday = now.startOf('day').toDate();
  const endOfToday = now.endOf('day').toDate();

  const handleShowModal = useCallback(() => {
    setShowModal(true);
  }, []);
  const handleHideModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const keyExtractor = useCallback(
    (_: Todo, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback(({item}: {item: Todo}) => {
    return <ItemTodo todo={item} onPress={handleShowModal} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListEmptyComponent = useMemo(() => {
    return (
      <View style={styles.containerLogo}>
        <Image
          source={require('src/media/images/LogoEmptyTodos.png')}
          style={styles.logo}
        />
        <Text style={styles.textBelowLogo}>
          Add tasks to do to make management easier.
        </Text>
      </View>
    );
  }, []);
  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separactor} />;
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('todos')
      .where('ownerId', '==', user.id)
      .where('timeStart', '>=', startOfToday)
      .where('timeStart', '<=', endOfToday)
      // .orderBy('timeStart', 'desc')
      .onSnapshot(res => {
        const cloneTodos: Todo[] = [];
        res.docs.map(todo => {
          cloneTodos.push({
            ...todo.data(),
            timeStart: todo.data().timeStart.toDate().toString(),
            timeEnd: todo.data().timeEnd.toDate().toString(),
          } as Todo);
        });
        setListTodos(cloneTodos);
      });

    return () => {
      console.log('unmount');
      subscriber();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={listTodos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.containerList}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      <ModalTodoDetail isVisible={showModal} onClose={handleHideModal} />
    </View>
  );
};

export default Today;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: rw(250),
    height: rh(200),
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: rh(100),
  },
  textBelowLogo: {
    color: EColor.color_666666,
    fontSize: rh(16),
  },
  containerList: {
    padding: rh(14),
  },
  separactor: {
    height: rh(10),
  },
});
