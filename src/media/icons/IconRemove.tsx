import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconRemove = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.72066 3.85039C9.6561 3.85039 9.59878 3.89171 9.57836 3.95296L9.17921 5.15039H14.8206L14.4214 3.95296C14.401 3.89171 14.3437 3.85039 14.2791 3.85039H9.72066ZM16.6125 5.15039L16.0342 3.41537C15.7824 2.65994 15.0754 2.15039 14.2791 2.15039H9.72066C8.92437 2.15039 8.21741 2.65994 7.9656 3.41537L7.38726 5.15039H4.9999H2.9999C2.53046 5.15039 2.1499 5.53095 2.1499 6.00039C2.1499 6.46983 2.53046 6.85039 2.9999 6.85039H4.20468L4.96509 18.2565C5.09992 20.2789 6.77968 21.8504 8.80656 21.8504H15.1932C17.2201 21.8504 18.8999 20.2789 19.0347 18.2565L19.7951 6.85039H20.9999C21.4693 6.85039 21.8499 6.46983 21.8499 6.00039C21.8499 5.53095 21.4693 5.15039 20.9999 5.15039H18.9999H16.6125ZM18.0913 6.85039H15.9999H7.9999H5.90846L6.66132 18.1434C6.73662 19.2728 7.67466 20.1504 8.80656 20.1504H15.1932C16.3251 20.1504 17.2632 19.2728 17.3385 18.1434L18.0913 6.85039Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconRemove;