import React from 'react';
import AppProvider from '#abong.code/provider/AppProvider';
import AppNavigation from 'src/navigation/AppNavigation';

const App = () => {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
};

export default App;
