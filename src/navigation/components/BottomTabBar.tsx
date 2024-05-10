import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {EColor} from 'src/enums/colors';
import IconListTodos from 'src/media/icons/IconListTodos';
import IconTodosToday from 'src/media/icons/IconTodosToday';
import IconMenu from 'src/media/icons/IconMenu';
import {rh} from 'src/helpers/responsive';

const tabIcon = [
  {
    icon: <IconListTodos width={24} height={24} />,
    iconFocus: <IconListTodos width={24} height={24} color={EColor.primary} />,
  },
  {
    icon: <IconTodosToday />,
    iconFocus: <IconTodosToday color={EColor.primary} />,
  },
  {
    icon: <IconMenu />,
    iconFocus: <IconMenu color={EColor.primary} />,
  },
];

export default function BottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.row, {paddingBottom: bottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = (
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name
        ) as string;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.btnBottomTab}>
            {isFocused ? tabIcon[index].iconFocus : tabIcon[index].icon}
            <Text
              style={[
                isFocused ? styles.textBtnActive : styles.textBtn,
                styles.mt2,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  btnBottomTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: rh(10),
  },
  textBtnActive: {
    color: EColor.primary,
    fontWeight: 'bold',
    fontSize: rh(12),
  },
  textBtn: {
    color: EColor.black,
    fontSize: rh(12),
  },
  mt2: {marginTop: rh(2)},
});
