import {ETodoStatus} from 'src/components/ModalAddTodo';
import {EColor} from 'src/enums/colors';

export const getColorStatus = (type?: ETodoStatus) => {
  if (type === ETodoStatus.DONE) {
    return EColor.color_0EB05C;
  } else if (type === ETodoStatus.IN_PROGRESS) {
    return EColor.orange;
  } else if (type === ETodoStatus.CANCELED) {
    return EColor.color_FF0B0B;
  } else {
    return EColor.color_666666;
  }
};
