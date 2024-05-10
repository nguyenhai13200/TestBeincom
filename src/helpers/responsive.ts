import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {
  DEFAULT_REFERENCE_SCREEN_HEIGHT,
  DEFAULT_REFERENCE_SCREEN_WIDTH,
} from 'src/utils/constants';

const responsiveByWidth = (
  value: number,
  referenceScreenWidth: number = DEFAULT_REFERENCE_SCREEN_WIDTH,
) => {
  return widthPercentageToDP((value / referenceScreenWidth) * 100);
};

const responsiveByHeight = (
  value: number,
  referenceScreenHeight: number = DEFAULT_REFERENCE_SCREEN_HEIGHT,
) => {
  return heightPercentageToDP((value / referenceScreenHeight) * 100);
};

export {responsiveByHeight as rh, responsiveByWidth as rw};
