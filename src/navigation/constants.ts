// Navigation screen names and constants

export const SCREEN_NAMES = {
  // Auth Stack Screens
  LOGIN: 'LoginScreen',
  REGISTER: 'RegisterScreen',

  // Dashboard Stack Screens
  HOME: 'HomeScreen',
  PROFILE: 'ProfileScreen',
  NOTE_EDIT: 'NoteEditScreen',

  // Root Stack Screens
  AUTH_STACK: 'AuthStack',
  DASHBOARD_STACK: 'DashboardStack',
} as const;

// Navigation options constants
export const NAVIGATION_OPTIONS = {
  // Screen options
  HIDE_HEADER: { headerShown: false },
  SHOW_HEADER: { headerShown: true },

  // Animation options
  DEFAULT_ANIMATION: 'default',
  FADE_ANIMATION: 'fade',
  SLIDE_ANIMATION: 'slide_from_right',

  // Transition presets
  MODAL_TRANSITION: 'modal',
  CARD_TRANSITION: 'card',
  SLIDE_TRANSITION: 'slide_from_bottom',
} as const;
