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
  border: '#D1D5DB'
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