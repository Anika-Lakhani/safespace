import * as Location from 'expo-location';
import { CONFIG } from '../utils/constants';

class LocationService {
  constructor() {
    this.trackingMode = 'normal'; // 'normal' | 'emergency'
    this.updateInterval = CONFIG.locationUpdateInterval;
    this.locationSubscription = null;
    this.currentLocation = null;
    this.onLocationUpdate = null;
  }

  // Get current location once
  async getCurrentLocation() {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10
      });
      
      this.currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy,
        timestamp: location.timestamp
      };
      
      return this.currentLocation;
    } catch (error) {
      console.error('Error getting current location:', error);
      throw error;
    }
  }

  // Start location tracking
  startTracking(onUpdate) {
    if (this.locationSubscription) {
      this.stopTracking();
    }

    this.onLocationUpdate = onUpdate;
    
    const locationSettings = {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: this.updateInterval,
      distanceInterval: 10
    };

    this.locationSubscription = Location.watchPositionAsync(
      locationSettings,
      (location) => {
        this.currentLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          timestamp: location.timestamp
        };
        
        if (this.onLocationUpdate) {
          this.onLocationUpdate(this.currentLocation);
        }
      }
    );
  }

  // Stop location tracking
  stopTracking() {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
    this.onLocationUpdate = null;
  }

  // Set tracking mode (for future emergency mode)
  setTrackingMode(mode) {
    this.trackingMode = mode;
    
    if (mode === 'emergency') {
      this.updateInterval = CONFIG.emergencyUpdateInterval;
    } else {
      this.updateInterval = CONFIG.locationUpdateInterval;
    }
    
    // Restart tracking with new settings if currently tracking
    if (this.locationSubscription) {
      this.startTracking(this.onLocationUpdate);
    }
  }

  // Get current tracking mode
  getTrackingMode() {
    return this.trackingMode;
  }

  // Get current location
  getCurrentLocationData() {
    return this.currentLocation;
  }

  // Check if location services are enabled
  async isLocationEnabled() {
    try {
      const isEnabled = await Location.hasServicesEnabledAsync();
      return isEnabled;
    } catch (error) {
      console.error('Error checking location services:', error);
      return false;
    }
  }
}

export default new LocationService(); 