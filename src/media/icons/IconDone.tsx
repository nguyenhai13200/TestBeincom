import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconDone = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9994 21.6004C14.5455 21.6004 16.9873 20.589 18.7876 18.7886C20.588 16.9883 21.5994 14.5465 21.5994 12.0004C21.5994 9.45431 20.588 7.01251 18.7876 5.21217C16.9873 3.41182 14.5455 2.40039 11.9994 2.40039C9.45334 2.40039 7.01154 3.41182 5.21119 5.21217C3.41084 7.01251 2.39941 9.45431 2.39941 12.0004C2.39941 14.5465 3.41084 16.9883 5.21119 18.7886C7.01154 20.589 9.45334 21.6004 11.9994 21.6004ZM16.4478 10.4488C16.6664 10.2225 16.7874 9.91935 16.7846 9.60471C16.7819 9.29007 16.6557 8.9891 16.4332 8.76661C16.2107 8.54412 15.9097 8.41792 15.5951 8.41518C15.2805 8.41245 14.9773 8.5334 14.751 8.75199L10.7994 12.7036L9.24781 11.152C9.02149 10.9334 8.71837 10.8124 8.40373 10.8152C8.0891 10.8179 7.78812 10.9441 7.56563 11.1666C7.34314 11.3891 7.21694 11.6901 7.2142 12.0047C7.21147 12.3193 7.33242 12.6225 7.55101 12.8488L9.95101 15.2488C10.176 15.4738 10.4812 15.6001 10.7994 15.6001C11.1176 15.6001 11.4228 15.4738 11.6478 15.2488L16.4478 10.4488Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconDone;