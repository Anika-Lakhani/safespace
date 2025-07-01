import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { MESSAGES } from './constants';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    } else {
      Alert.alert(
        'Permission Required',
        MESSAGES.locationPermissionRequired,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => Location.openSettingsAsync() }
        ]
      );
      return false;
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    Alert.alert('Error', 'Failed to request location permission');
    return false;
  }
};

export const checkLocationPermission = async () => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking location permission:', error);
    return false;
  }
};

export const getLocationSettings = () => {
  return {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 30000, // 30 seconds
    distanceInterval: 10 // 10 meters
  };
}; 