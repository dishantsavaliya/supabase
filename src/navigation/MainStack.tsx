import React, { useEffect, Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DashboardStack from './DashboardStack';
import AuthStack from './AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from './constants';
import type { RootStackParamList } from './types';
import SettingsProvider from '../providers/SettingsProvider';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../utils/toast/ToastConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, View, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';
import { colors } from '../constants/colors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  setUser,
  setInitialized,
  setLoading,
} from '../redux/features/auth/authSlice';
import NetInfo from '@react-native-community/netinfo';

const MainStack = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const dispatch = useAppDispatch();
  const { user, isLoading, isInitialized } = useAppSelector(
    state => state.auth,
  );

  useEffect(() => {
    const init = async () => {
      try {
        const networkState = await NetInfo.fetch();
        const online = networkState.isConnected ?? false;

        if (!online) {
          dispatch(setInitialized(true));
          dispatch(setLoading(false));
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        dispatch(setUser(session?.user ?? null));
      } catch (error) {
        dispatch(setUser(user ?? null));
      }
    };

    if (!isInitialized) {
      init();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch, isInitialized]);

  if (isLoading || !isInitialized) {
    return (
      <>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.burntOrange} />
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Suspense>
        <NavigationContainer>
          <SettingsProvider>
            <GestureHandlerRootView>
              <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                  <RootStack.Screen
                    name={SCREEN_NAMES.DASHBOARD_STACK}
                    component={DashboardStack}
                  />
                ) : (
                  <RootStack.Screen
                    name={SCREEN_NAMES.AUTH_STACK}
                    component={AuthStack}
                  />
                )}
              </RootStack.Navigator>
              <Toast config={toastConfig} />
            </GestureHandlerRootView>
          </SettingsProvider>
        </NavigationContainer>
      </Suspense>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});

export default MainStack;
