import Toast from 'react-native-simple-toast';
import {EColor} from 'src/enums/colors';
export const showSuccessToastMessage = (
  message: string,
  duration = Toast.SHORT,
) => {
  Toast.show(message, duration, {backgroundColor: EColor.color_0EB05C});
};
export const showErrorToastMessage = (
  message: string,
  duration = Toast.SHORT,
) => {
  Toast.show(message, duration, {backgroundColor: EColor.color_FF0B0B});
};
