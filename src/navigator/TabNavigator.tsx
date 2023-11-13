import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/ProfileScreen'
import UploadVideoScreen from '../screens/UploadVideo';
import UserSearchScreen from '../screens/SearchScreen';
const BottomTab = createBottomTabNavigator();

export default () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <BottomTab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          tabBarStyle: { backgroundColor: 'black', borderRadius: 30, marginBottom: 10 },
          headerShown: false,
          tabBarActiveTintColor: 'white',
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/home.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Discover"
          component={UserSearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/search.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="NewVideo"
          component={UploadVideoScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/digitalocean-icon.png')}
                style={[
                  styles.newVideoButton,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Inbox"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/message.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('../assets/images/user.png')}
                style={[
                  styles.bottomTabIcon,
                  focused && styles.bottomTabIconFocused,
                ]}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabIcon: {
    width: 20,
    height: 16,
    tintColor: 'grey',
  },
  bottomTabIconFocused: {
    tintColor: 'white',
  },
  newVideoButton: {
    width: 30,
    height: 30,
  },
});
