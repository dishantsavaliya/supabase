import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { DashboardStackParamList } from './types';
import { SCREEN_NAMES, NAVIGATION_OPTIONS } from './constants';
import HomeScreen from '../screens/home';
import ProfileScreen from '../screens/setting/profileScreen';
import NoteEditScreen from '../screens/notes/noteEdit';

const Stack = createNativeStackNavigator<DashboardStackParamList>();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...NAVIGATION_OPTIONS.HIDE_HEADER,
        animation: NAVIGATION_OPTIONS.SLIDE_ANIMATION,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={SCREEN_NAMES.HOME}
    >
      <Stack.Screen
        name={SCREEN_NAMES.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.PROFILE}
        component={ProfileScreen}
        options={{
          title: 'Profile',
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.NOTE_EDIT}
        component={NoteEditScreen}
        options={{
          title: 'Note',
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
