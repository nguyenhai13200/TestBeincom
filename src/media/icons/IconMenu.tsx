import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconMenu = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.85 6C5.38056 6 5 6.38056 5 6.85C5 7.31944 5.38056 7.7 5.85 7.7H11.85H17.85C18.3194 7.7 18.7 7.31944 18.7 6.85C18.7 6.38056 18.3194 6 17.85 6H11.85H5.85ZM5.85 11.5C5.38056 11.5 5 11.8806 5 12.35C5 12.8194 5.38056 13.2 5.85 13.2H11.85H17.85C18.3194 13.2 18.7 12.8194 18.7 12.35C18.7 11.8806 18.3194 11.5 17.85 11.5H11.85H5.85Z"
      fill={props.color || '#091E42'}
    />
    <Path
      d="M5.85 16.65C5.38056 16.65 5 17.0306 5 17.5C5 17.9694 5.38056 18.35 5.85 18.35H11.85H17.85C18.3194 18.35 18.7 17.9694 18.7 17.5C18.7 17.0306 18.3194 16.65 17.85 16.65H11.85H5.85Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconMenu;
