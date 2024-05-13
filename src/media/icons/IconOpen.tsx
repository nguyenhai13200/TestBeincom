import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconOpen = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.8499 12.0004C3.8499 7.49927 7.49878 3.85039 11.9999 3.85039C16.501 3.85039 20.1499 7.49927 20.1499 12.0004C20.1499 16.5015 16.501 20.1504 11.9999 20.1504C7.49878 20.1504 3.8499 16.5015 3.8499 12.0004ZM11.9999 2.15039C6.5599 2.15039 2.1499 6.56039 2.1499 12.0004C2.1499 17.4404 6.5599 21.8504 11.9999 21.8504C17.4399 21.8504 21.8499 17.4404 21.8499 12.0004C21.8499 6.56039 17.4399 2.15039 11.9999 2.15039ZM9.8499 12.0004C9.8499 10.813 10.8125 9.85039 11.9999 9.85039C13.1873 9.85039 14.1499 10.813 14.1499 12.0004C14.1499 13.1878 13.1873 14.1504 11.9999 14.1504C10.8125 14.1504 9.8499 13.1878 9.8499 12.0004ZM11.9999 8.15039C9.87361 8.15039 8.1499 9.87409 8.1499 12.0004C8.1499 14.1267 9.87361 15.8504 11.9999 15.8504C14.1262 15.8504 15.8499 14.1267 15.8499 12.0004C15.8499 9.87409 14.1262 8.15039 11.9999 8.15039Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconOpen;
