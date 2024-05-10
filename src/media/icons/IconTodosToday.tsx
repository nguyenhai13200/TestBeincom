import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconTodosToday = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99997 0.150391C8.46941 0.150391 8.84997 0.530949 8.84997 1.00039V2.15039H14.6L14.637 2.15039C14.8137 2.15039 14.9846 2.15039 15.15 2.15063V1.00039C15.15 0.530949 15.5305 0.150391 16 0.150391C16.4694 0.150391 16.85 0.530949 16.85 1.00039V2.1795C17.0059 2.18688 17.1546 2.19612 17.2964 2.20771C18.016 2.2665 18.6342 2.38979 19.2018 2.67901C20.1144 3.144 20.8564 3.88595 21.3214 4.79854C21.6106 5.36616 21.7339 5.98441 21.7927 6.70398C21.85 7.40572 21.85 8.27469 21.85 9.36346V9.40039V14.6004V14.6373C21.85 15.7261 21.85 16.5951 21.7927 17.2968C21.7339 18.0164 21.6106 18.6346 21.3214 19.2022C20.8564 20.1148 20.1144 20.8568 19.2018 21.3218C18.6342 21.611 18.016 21.7343 17.2964 21.7931C16.5947 21.8504 15.7257 21.8504 14.637 21.8504H14.6H9.39997H9.36294C8.27421 21.8504 7.40527 21.8504 6.70356 21.7931C5.98399 21.7343 5.36574 21.611 4.79812 21.3218C3.88553 20.8568 3.14357 20.1148 2.67859 19.2022C2.38937 18.6346 2.26608 18.0164 2.20729 17.2968C2.14996 16.5951 2.14996 15.7261 2.14997 14.6374L2.14997 14.6004V8.64745L2.14994 8.47607C2.14952 7.10848 2.14925 6.2114 2.40139 5.4591C2.88473 4.017 4.01658 2.88516 5.45868 2.40181C5.9363 2.24173 6.47228 2.18339 7.14997 2.16224V1.00039C7.14997 0.530949 7.53053 0.150391 7.99997 0.150391ZM15.15 3.85069V4.00039C15.15 4.46983 15.5305 4.85039 16 4.85039C16.4694 4.85039 16.85 4.46983 16.85 4.00039V3.88155C16.9574 3.88727 17.0598 3.89405 17.1579 3.90206C17.7724 3.95227 18.142 4.04696 18.43 4.19372C19.0228 4.49572 19.5046 4.97761 19.8066 5.57032C19.9534 5.85835 20.0481 6.22797 20.0983 6.84242C20.1493 7.46678 20.15 8.26626 20.15 9.40039V14.6004C20.15 15.7345 20.1493 16.534 20.0983 17.1584C20.0481 17.7728 19.9534 18.1424 19.8066 18.4305C19.5046 19.0232 19.0228 19.5051 18.43 19.8071C18.142 19.9538 17.7724 20.0485 17.1579 20.0987C16.5336 20.1497 15.7341 20.1504 14.6 20.1504H9.39997C8.26584 20.1504 7.46636 20.1497 6.84199 20.0987C6.22755 20.0485 5.85793 19.9538 5.5699 19.8071C4.97719 19.5051 4.4953 19.0232 4.1933 18.4305C4.04654 18.1424 3.95185 17.7728 3.90164 17.1584C3.85063 16.534 3.84997 15.7345 3.84997 14.6004V8.64745C3.84997 7.04621 3.86108 6.45341 4.01326 5.99935C4.32719 5.06273 5.0623 4.32761 5.99893 4.01368C6.27072 3.92259 6.59223 3.88204 7.14997 3.86417V4.00039C7.14997 4.46983 7.53053 4.85039 7.99997 4.85039C8.46941 4.85039 8.84997 4.46983 8.84997 4.00039V3.85039H14.6C14.7927 3.85039 14.9758 3.85041 15.15 3.85069ZM6.14998 8.00039C6.14998 7.53095 6.53054 7.15039 6.99998 7.15039H17C17.4694 7.15039 17.85 7.53095 17.85 8.00039C17.85 8.46983 17.4694 8.85039 17 8.85039H6.99998C6.53054 8.85039 6.14998 8.46983 6.14998 8.00039ZM15 16.1504C14.5305 16.1504 14.15 16.5309 14.15 17.0004C14.15 17.4698 14.5305 17.8504 15 17.8504H17C17.4694 17.8504 17.85 17.4698 17.85 17.0004C17.85 16.5309 17.4694 16.1504 17 16.1504H15Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconTodosToday;