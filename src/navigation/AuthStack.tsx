import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AuthStackParamList } from './types';
import { SCREEN_NAMES, NAVIGATION_OPTIONS } from './constants';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...NAVIGATION_OPTIONS.HIDE_HEADER,
        animation: NAVIGATION_OPTIONS.SLIDE_ANIMATION,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      initialRouteName={SCREEN_NAMES.LOGIN}
    >
      <Stack.Screen
        name={SCREEN_NAMES.LOGIN}
        component={LoginScreen}
        options={{
          title: 'Login',
          animationTypeForReplace: 'push',
        }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.REGISTER}
        component={RegisterScreen}
        options={{
          title: 'Register',
          animationTypeForReplace: 'push',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
