/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AuthProvider} from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import {StatusBar} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {alertRef} from './helpers/PopupHelper';
import {colors} from './theme';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle={'dark-content'} />
      <RootNavigator />
      <DropdownAlert
        ref={alertRef}
        closeInterval={2000}
        activeStatusBarStyle="light-content"
        inactiveStatusBarBackgroundColor={colors.white}
        inactiveStatusBarStyle="dark-content"
      />
    </AuthProvider>
  );
};

export default App;
