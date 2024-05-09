import React from 'react';
type Props = {
  children: JSX.Element;
};
const AppProvider = ({children}: Props) => {
  return <>{children}</>;
};

export default AppProvider;
