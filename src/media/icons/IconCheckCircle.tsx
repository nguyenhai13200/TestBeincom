import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {EColor} from 'src/enums/colors';
const IconCheckCircle = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.8499 12.0004C3.8499 7.49927 7.49878 3.85039 11.9999 3.85039C16.501 3.85039 20.1499 7.49927 20.1499 12.0004C20.1499 16.5015 16.501 20.1504 11.9999 20.1504C7.49878 20.1504 3.8499 16.5015 3.8499 12.0004ZM11.9999 2.15039C6.5599 2.15039 2.1499 6.56039 2.1499 12.0004C2.1499 17.4404 6.5599 21.8504 11.9999 21.8504C17.4399 21.8504 21.8499 17.4404 21.8499 12.0004C21.8499 6.56039 17.4399 2.15039 11.9999 2.15039ZM16.6009 9.60143C16.9329 9.26949 16.9329 8.7313 16.6009 8.39935C16.269 8.0674 15.7308 8.0674 15.3989 8.39935L10.9999 12.7983L9.60094 11.3994C9.269 11.0674 8.73081 11.0674 8.39886 11.3994C8.06692 11.7313 8.06692 12.2695 8.39886 12.6014L10.3989 14.6014C10.5583 14.7608 10.7745 14.8504 10.9999 14.8504C11.2253 14.8504 11.4415 14.7608 11.6009 14.6014L16.6009 9.60143Z"
      fill={props.color || EColor.color_666666}
    />
  </Svg>
);
export default IconCheckCircle;
