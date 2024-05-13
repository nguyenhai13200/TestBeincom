import {
  DefaultSectionT,
  Image,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import IconPlus from 'src/media/icons/IconPlus';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import ItemTodo, {Todo} from 'src/components/ItemTodo';
import Header from 'src/components/Header';
import ModalAddTodo from 'src/components/ModalAddTodo';
import {useDispatch, useSelector} from 'react-redux';
import {RootReduxState} from 'src/redux/store';
import firestore from '@react-native-firebase/firestore';
import {getTodos} from 'src/redux/reducers/todoSlice';
import {groupData} from 'src/helpers/groupData';

const Todos = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootReduxState) => state.auth);
  const {listTodos} = useSelector((state: RootReduxState) => state.todos);
  const [showModal, setShowModal] = useState(false);

  const sections = useMemo(
    () =>
      Object.keys(groupData(listTodos)).map(date => ({
        title: date,
        data: groupData(listTodos)[date],
      })),
    [listTodos],
  );

  const getDataTodos = () => {
    firestore()
      .collection('todos')
      .where('ownerId', '==', user.id)
      .get()
      .then(res => {
        const cloneTodos: Todo[] = [];
        res.docs.map(todo => {
          cloneTodos.push({
            ...todo.data(),
            timeStart: todo.data().timeStart.toDate().toString(),
            timeEnd: todo.data().timeEnd.toDate().toString(),
          } as Todo);
        });
        dispatch(getTodos({listTodos: cloneTodos}));
      });
  };

  const keyExtractor = useCallback(
    (_: Todo, index: number) => index.toString(),
    [],
  );

  const renderItem = useCallback(({item}: {item: Todo}) => {
    return <ItemTodo todo={item} />;
  }, []);

  const renderSectionHeader = useCallback(
    ({section: {title}}: {section: SectionListData<Todo, DefaultSectionT>}) => (
      <Text style={styles.title}>{title}</Text>
    ),
    [],
  );

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
    getDataTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <SectionList
        sections={sections}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.containerList}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity
        style={styles.btnAddTodo}
        onPress={() => setShowModal(true)}>
        <IconPlus color={EColor.white} height={rh(30)} width={rh(30)} />
      </TouchableOpacity>
      <ModalAddTodo isVisible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnAddTodo: {
    width: rh(50),
    height: rh(50),
    borderRadius: rh(50),
    backgroundColor: EColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: rh(10),
    right: rw(20),
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
  title: {
    color: EColor.primary,
    fontSize: rh(16),
    fontWeight: 'bold',
    marginVertical: rh(10),
  },
});
