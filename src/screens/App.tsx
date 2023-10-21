import React from 'react';
import TabNavigator from '../navigator/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider, { useAuth } from '../authentication/AuthContext';

export default () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TabNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};
