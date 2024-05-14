import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ETodoStatus} from './ModalAddTodo';
import IconOpen from 'src/media/icons/IconOpen';
import {Dropdown} from 'react-native-element-dropdown';
import {getColorStatus} from 'src/helpers/getColorStatus';
import {rh, rw} from 'src/helpers/responsive';
import IconCancel from 'src/media/icons/IconCancel';
import IconDone from 'src/media/icons/IconDone';
import IconProgress from 'src/media/icons/IconProgress';
import {EColor} from 'src/enums/colors';

type Props = {
  status?: ETodoStatus;
  onPress: (status: ETodoStatus) => void;
};

type TDataDropdown = {
  label: ETodoStatus;
  value: string;
};

const data: TDataDropdown[] = [
  {label: ETodoStatus.OPEN, value: '1'},
  {label: ETodoStatus.IN_PROGRESS, value: '2'},
  {label: ETodoStatus.DONE, value: '3'},
  {label: ETodoStatus.CANCELED, value: '4'},
];

const DropdownStatus = (props: Props) => {
  const [value, setValue] = useState(
    data.filter(e => e.label === props.status)[0].value || '1',
  );
  const statusSelect = data.filter(e => e.value === value)[0].label;
  const renderLeftIcon = () => {
    return (
      <>
        {statusSelect === ETodoStatus.IN_PROGRESS && (
          <IconProgress
            height={rh(18)}
            width={rh(18)}
            color={getColorStatus(ETodoStatus.IN_PROGRESS)}
          />
        )}
        {statusSelect === ETodoStatus.DONE && (
          <IconDone
            height={rh(18)}
            width={rh(18)}
            color={getColorStatus(ETodoStatus.DONE)}
          />
        )}
        {statusSelect === ETodoStatus.OPEN && (
          <IconOpen
            height={rh(18)}
            width={rh(18)}
            color={getColorStatus(ETodoStatus.OPEN)}
          />
        )}
        {statusSelect === ETodoStatus.CANCELED && (
          <IconCancel
            height={rh(18)}
            width={rh(18)}
            color={getColorStatus(ETodoStatus.CANCELED)}
          />
        )}
      </>
    );
  };
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      itemTextStyle={{color: EColor.color_666666}}
      selectedTextStyle={[
        styles.selectedTextStyle,
        {color: getColorStatus(statusSelect)},
      ]}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        props.onPress && props.onPress(item.label);
        setValue(item.value);
      }}
      iconColor="red"
      renderRightIcon={() => <></>}
      renderLeftIcon={renderLeftIcon}
    />
  );
};

export default DropdownStatus;

const styles = StyleSheet.create({
  dropdown: {
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,
    width: 150,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: rw(5),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
