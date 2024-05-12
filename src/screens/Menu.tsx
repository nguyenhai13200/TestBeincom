import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {EColor} from 'src/enums/colors';
import {rh, rw} from 'src/helpers/responsive';
import {useDispatch, useSelector} from 'react-redux';
import {resetAuth} from 'src/redux/reducers/authSlice';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from 'src/navigation/params';
import {ERootStack} from 'src/enums/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootReduxState} from 'src/redux/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Menu = () => {
  const {top} = useSafeAreaInsets();
  const dispatch = useDispatch();
  const user = useSelector((state: RootReduxState) => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const handleLogOut = async () => {
    dispatch(resetAuth());
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({index: 0, routes: [{name: ERootStack.Login}]}),
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.boxInfo, {paddingTop: top, height: top + rh(50)}]}>
          <View style={styles.avatar}>
            <Text style={styles.textAvatar}>{user.fullName[0]}</Text>
          </View>
          <Text style={styles.textFullName}>{user.fullName}</Text>
        </View>
        <View style={styles.boxUsername}>
          <Text style={styles.textUsername}>@{user.username}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogout} onPress={handleLogOut}>
        <Text style={styles.textLogout}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textLogout: {
    color: EColor.color_FF0B0B,
    fontSize: rh(18),
    fontWeight: 'bold',
  },
  btnLogout: {
    backgroundColor: EColor.white,
    paddingVertical: rh(10),
    paddingHorizontal: rw(100),
    borderRadius: rh(10),
    alignSelf: 'center',
    marginTop: rh(200),
  },
  header: {
    backgroundColor: EColor.white,
  },
  avatar: {
    width: rh(50),
    height: rh(50),
    backgroundColor: EColor.color_cccccc,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rh(100),
    marginTop: rh(25),
    marginHorizontal: rw(16),
  },
  boxInfo: {
    backgroundColor: EColor.primary,
  },
  textAvatar: {
    color: EColor.black,
    fontSize: rh(16),
    fontWeight: 'bold',
  },
  boxUsername: {
    height: rh(40),
  },
  textFullName: {
    color: EColor.white,
    fontSize: rh(18),
    fontWeight: '700',
    position: 'absolute',
    left: rw(50 + 32),
    bottom: rh(2),
  },
  textUsername: {
    position: 'absolute',
    top: rh(3),
    left: rw(50 + 32),
    color: EColor.black,
  },
});
