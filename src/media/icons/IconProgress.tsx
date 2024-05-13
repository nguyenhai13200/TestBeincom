import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const IconProgress = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M15.2837 15.3491C15.8076 15.5237 16.3739 15.2406 16.5486 14.7166C16.7232 14.1927 16.4401 13.6264 15.9161 13.4517L15.2837 15.3491ZM11.9999 13.2004H10.9999C10.9999 13.6308 11.2753 14.013 11.6837 14.1491L11.9999 13.2004ZM12.9999 8.18265C12.9999 7.63036 12.5522 7.18265 11.9999 7.18265C11.4476 7.18265 10.9999 7.63036 10.9999 8.18265H12.9999ZM15.9161 13.4517L12.3161 12.2517L11.6837 14.1491L15.2837 15.3491L15.9161 13.4517ZM12.9999 13.2004V8.18265H10.9999V13.2004H12.9999ZM20.5999 12.0004C20.5999 16.75 16.7495 20.6004 11.9999 20.6004V22.6004C17.8541 22.6004 22.5999 17.8546 22.5999 12.0004H20.5999ZM11.9999 20.6004C7.25025 20.6004 3.3999 16.75 3.3999 12.0004H1.3999C1.3999 17.8546 6.14568 22.6004 11.9999 22.6004V20.6004ZM3.3999 12.0004C3.3999 7.25074 7.25025 3.40039 11.9999 3.40039V1.40039C6.14568 1.40039 1.3999 6.14617 1.3999 12.0004H3.3999ZM11.9999 3.40039C16.7495 3.40039 20.5999 7.25074 20.5999 12.0004H22.5999C22.5999 6.14617 17.8541 1.40039 11.9999 1.40039V3.40039Z"
      fill={props.color || '#091E42'}
    />
  </Svg>
);
export default IconProgress;
