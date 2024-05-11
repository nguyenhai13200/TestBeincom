import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconClose = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.39886 5.39935C5.73081 5.0674 6.269 5.0674 6.60094 5.39935L11.9999 10.7983L17.3989 5.39935C17.7308 5.0674 18.269 5.0674 18.6009 5.39935C18.9329 5.7313 18.9329 6.26949 18.6009 6.60143L13.202 12.0004L18.6009 17.3994C18.9329 17.7313 18.9329 18.2695 18.6009 18.6014C18.269 18.9334 17.7308 18.9334 17.3989 18.6014L11.9999 13.2025L6.60094 18.6014C6.269 18.9334 5.73081 18.9334 5.39886 18.6014C5.06692 18.2695 5.06692 17.7313 5.39886 17.3994L10.7978 12.0004L5.39886 6.60143C5.06692 6.26949 5.06692 5.7313 5.39886 5.39935Z"
      fill="#091E42"
    />
  </Svg>
);
export default IconClose;