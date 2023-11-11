// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from '../authentication/AuthContext';
import TabNavigator from '../navigator/TabNavigator';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Simulate some loading time, like fetching data or initializing resources
    const timeout = setTimeout(() => {
      // Navigate to the main screen or any other screen you want
      navigation.navigate('Main');
    }, 4000); // 2000 milliseconds (2 seconds) for example

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Customize text color
  },
});

export default () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <NavigationContainer>
      <AuthProvider>
        {showSplash ? (
          <SplashScreen navigation={{ navigate: () => setShowSplash(false) }} />
        ) : (
          <TabNavigator />
        )}
      </AuthProvider>
    </NavigationContainer>
  );
};
