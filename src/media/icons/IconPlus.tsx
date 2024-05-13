import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconPlus = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9999 5.15039C12.4693 5.15039 12.8499 5.53095 12.8499 6.00039V11.1504H17.9999C18.4693 11.1504 18.8499 11.5309 18.8499 12.0004C18.8499 12.4698 18.4693 12.8504 17.9999 12.8504H12.8499V18.0004C12.8499 18.4698 12.4693 18.8504 11.9999 18.8504C11.5305 18.8504 11.1499 18.4698 11.1499 18.0004V12.8504H5.9999C5.53046 12.8504 5.1499 12.4698 5.1499 12.0004C5.1499 11.5309 5.53046 11.1504 5.9999 11.1504H11.1499V6.00039C11.1499 5.53095 11.5305 5.15039 11.9999 5.15039Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconPlus;
