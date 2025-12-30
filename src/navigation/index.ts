// Navigation exports - clean barrel exports
export { default as MainStack } from './MainStack';
export { default as AuthStack } from './AuthStack';
export { default as DashboardStack } from './DashboardStack';

// Hooks
export {
  useAuthNavigation,
  useDashboardNavigation,
} from './hooks';

// Types and Constants
export type {
  AuthStackParamList,
  DashboardStackParamList,
  RootStackParamList,
  AuthStackNavigationProp,
  DashboardStackNavigationProp,
  RootStackNavigationProp,
} from './types';

export { SCREEN_NAMES, NAVIGATION_OPTIONS } from './constants';
