// Navigation type definitions for better type safety

// Auth Stack Parameters
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

// Dashboard Stack Parameters
export type DashboardStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  NoteEditScreen: { noteId?: string; viewOnly?: boolean };
};

// Root Stack Parameters
export type RootStackParamList = {
  AuthStack: undefined;
  DashboardStack: undefined;
};

// Navigation prop types
export type AuthStackNavigationProp = NavigationProp<AuthStackParamList>;
export type DashboardStackNavigationProp =
  NavigationProp<DashboardStackParamList>;
export type RootStackNavigationProp = NavigationProp<RootStackParamList>;

import { NavigationProp } from '@react-navigation/native';
