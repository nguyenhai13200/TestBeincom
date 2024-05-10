import * as React from 'react';
import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const IconListTodos = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <G clipPath="url(#clip0_3140_141912)">
      <Path
        d="M5 13H3.2L5 10.9V10H2V11H3.8L2 13.1V14H5V13ZM7 5H21V7H7V5ZM5 16H2V17H4V17.5H3V18.5H4V19H2V20H5V16ZM7 17H21V19H7V17ZM3 8H4V4H2V5H3V8ZM7 11H21V13H7V11Z"
        fill={props.color || '#091E42'}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_3140_141912">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IconListTodos;
