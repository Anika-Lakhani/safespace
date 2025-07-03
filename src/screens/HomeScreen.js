import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, MESSAGES } from '../utils/constants';
import MapViewComponent from '../components/MapView';
import AssistanceButton from '../components/AssistanceButton';
import ConfirmationDialog from '../components/ConfirmationDialog';
import LocationService from '../services/LocationService';
import AlertService from '../services/AlertService';
import { requestLocationPermission, checkLocationPermission } from '../utils/permissions';
import { MockDataService } from '../services/MockDataService';

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyUsersCount, setNearbyUsersCount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      
      // Check and request location permissions
      const permissionGranted = await requestLocationPermission();
      setHasPermission(permissionGranted);
      
      if (permissionGranted) {
        await startLocationTracking();
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      Alert.alert('Error', 'Failed to initialize the app');
    } finally {
      setIsLoading(false);
    }
  };

  const startLocationTracking = async () => {
    try {
      // Get initial location
      const location = await LocationService.getCurrentLocation();
      setUserLocation(location);
      
      // Start continuous tracking
      LocationService.startTracking((newLocation) => {
        setUserLocation(newLocation);
        updateNearbyUsersCount(newLocation);
      });
      
      // Update nearby users count
      updateNearbyUsersCount(location);
      
    } catch (error) {
      console.error('Error starting location tracking:', error);
      Alert.alert('Location Error', 'Failed to get your location');
    }
  };

  const updateNearbyUsersCount = (location) => {
    if (!location) return;
    
    const count = MockDataService.getNearbyUsersCount(
      location.latitude,
      location.longitude
    );
    setNearbyUsersCount(count);
  };

  const handleAssistanceRequest = (mode) => {
    if (!userLocation) {
      Alert.alert('Location Required', 'Please wait for your location to be determined');
      return;
    }
    
    setShowConfirmation(true);
  };

  const handleConfirmAssistance = async (additionalNote) => {
    try {
      const result = await AlertService.sendAssistanceRequest(userLocation, additionalNote);
      
      if (result.success) {
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error sending assistance request:', error);
      Alert.alert('Error', 'Failed to send assistance request');
    }
  };

  const handleMarkerPress = (user) => {
    if (user.id === 'current_user') return;
    
    const genderText = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
    Alert.alert('Nearby User', `Gender: ${genderText}`);
  };

  const handleSettingsPress = () => {
    // Navigate to settings screen
    if (navigation) {
      navigation.navigate('Settings');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Initializing SafeSpace...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Location permission is required to use SafeSpace
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={initializeApp}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appTitle}>SafeSpace</Text>
        </View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapViewComponent
          userLocation={userLocation}
          onMapReady={() => console.log('Map ready')}
          onMarkerPress={handleMarkerPress}
        />
      </View>

      {/* Assistance Button */}
      <AssistanceButton
        onPress={handleAssistanceRequest}
        disabled={!userLocation}
        nearbyUsersCount={nearbyUsersCount}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        visible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmAssistance}
        nearbyUsersCount={nearbyUsersCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.background,
  },
  permissionText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.borderRadius,
  },
  permissionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    height: SIZES.headerHeight,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  settingsButton: {
    padding: SIZES.margin,
  },
  mapContainer: {
    flex: 1,
  },
});

export default HomeScreen; 