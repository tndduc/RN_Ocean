import React from 'react';
import TabNavigator from '../navigator/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
