export const COLORS = {
  primary: '#6B46C1',
  emergency: '#EF4444',
  assistance: '#F59E0B',
  safe: '#10B981',
  background: '#F9FAFB',
  text: '#374151',
  male: '#3B82F6',
  female: '#EC4899',
  nonBinary: '#8B5CF6',
  white: '#FFFFFF',
  gray: '#9CA3AF',
  lightGray: '#E5E7EB',
  border: '#D1D5DB',
  // Gender-specific marker colors
  man: '#3B82F6',
  woman: '#EC4899',
  'non-binary': '#8B5CF6'
};

export const ALERT_TYPES = {
  ASSISTANCE: 'assistance',
  EMERGENCY: 'emergency' // for future use
};

export const BUTTON_MODES = {
  ASSISTANCE: 'assistance',
  EMERGENCY: 'emergency' // prepare for 5-second hold
};

export const CONFIG = {
  defaultAlertRadius: 2000, // 2km in meters
  locationUpdateInterval: 30000, // 30 seconds
  emergencyUpdateInterval: 1000, // for future use
  mockUsersCount: 8,
  maxZoomLevel: 18,
  minZoomLevel: 10
};

export const SIZES = {
  buttonHeight: 60,
  headerHeight: 60,
  borderRadius: 12,
  padding: 16,
  margin: 8
};

export const MESSAGES = {
  assistanceRequest: 'Request help from nearby users?',
  alertSent: 'Alert sent to {count} nearby users',
  locationPermissionRequired: 'Location permission is required to use this app',
  locationPermissionDenied: 'Location permission denied. Please enable in settings.',
  batteryWarning: 'Location tracking may use significant battery. Enable power-saving mode?'
};

// New constants for Phase 1.5
export const GENDER_OPTIONS = [
  { id: 'woman', label: 'Woman', color: COLORS.woman },
  { id: 'man', label: 'Man', color: COLORS.man },
  { id: 'non-binary', label: 'Non-binary', color: COLORS['non-binary'] }
];

export const PRIVACY_SETTINGS_DEFAULTS = {
  visibleToMen: true,
  visibleToWomen: true,
  visibleToNonBinary: true,
  canReceiveRequestsFromMen: false, // Conservative default
  canReceiveRequestsFromWomen: true,
  canReceiveRequestsFromNonBinary: true
};

export const STORAGE_KEYS = {
  USER_PROFILE: 'userProfile',
  ONBOARDING_COMPLETED: 'onboardingCompleted'
};

export const ONBOARDING_MESSAGES = {
  welcome: {
    title: 'Welcome to SafeSpace',
    subtitle: 'Your personal safety companion',
    description: 'SafeSpace helps you stay connected with trusted contacts and get assistance when you need it most.'
  },
  location: {
    title: 'Location Access',
    subtitle: 'Stay connected and safe',
    description: 'Location is used to show you nearby users and help you request assistance when needed.',
    permissionText: 'Enable Location Access'
  },
  gender: {
    title: 'How would you like to identify yourself?',
    subtitle: 'This affects how you appear on the map',
    description: 'Choose the option that best represents you. This helps other users understand who they\'re connecting with.'
  },
  privacy: {
    title: 'Privacy Settings',
    subtitle: 'Control who can see and help you',
    description: 'You can change these settings anytime in the app settings.',
    visibilityTitle: 'Who can see me on the map',
    assistanceTitle: 'Who can respond to my requests'
  }
}; 