import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { SCREEN_NAMES } from './constants';
import type {
  AuthStackNavigationProp,
  DashboardStackNavigationProp,
} from './types';

export const useAuthNavigation = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const navigateToLogin = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.LOGIN as never);
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.REGISTER as never);
  }, [navigation]);

  return {
    ...navigation,
    navigateToLogin,
    navigateToRegister,
  };
};

export const useDashboardNavigation = () => {
  const navigation = useNavigation<DashboardStackNavigationProp>();

  const navigateToHome = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.HOME as never);
  }, [navigation]);

  const navigateToProfile = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.PROFILE as never);
  }, [navigation]);

  const navigateToNoteEdit = useCallback(
    (params?: { noteId?: string; viewOnly?: boolean }) => {
      navigation.navigate(SCREEN_NAMES.NOTE_EDIT, params || {});
    },
    [navigation],
  );

  return {
    ...navigation,
    navigateToHome,
    navigateToProfile,
    navigateToNoteEdit,
  };
};

