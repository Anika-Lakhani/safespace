import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS, SIZES, CONFIG } from '../utils/constants';
import UserPin from './UserPin';
import { MockDataService } from '../services/MockDataService';

const MapViewComponent = ({ userLocation, onMapReady, onMarkerPress }) => {
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (userLocation) {
      generateNearbyUsers();
      setInitialRegion();
    }
  }, [userLocation]);

  const generateNearbyUsers = () => {
    if (!userLocation) return;
    
    const mockUsers = MockDataService.generateMockUsers(
      userLocation.latitude,
      userLocation.longitude
    );
    setNearbyUsers(mockUsers);
  };

  const setInitialRegion = () => {
    if (!userLocation) return;
    
    setRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.02, // ~2km radius
      longitudeDelta: 0.02,
    });
  };

  const handleMapReady = () => {
    setIsLoading(false);
    if (onMapReady) {
      onMapReady();
    }
  };

  const handleMarkerPress = (user) => {
    if (onMarkerPress) {
      onMarkerPress(user);
    } else {
      // Default behavior: show gender info
      const genderText = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
      Alert.alert('Nearby User', `Gender: ${genderText}`);
    }
  };

  const renderUserMarker = (user, isCurrentUser = false) => {
    return (
      <Marker
        key={user.id}
        coordinate={{
          latitude: user.lat || user.latitude,
          longitude: user.lng || user.longitude,
        }}
        onPress={() => handleMarkerPress(user)}
      >
        <UserPin user={user} isCurrentUser={isCurrentUser} />
      </Marker>
    );
  };

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onMapReady={handleMapReady}
        showsUserLocation={false} // We'll use custom markers
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        zoomEnabled={true}
        scrollEnabled={true}
        rotateEnabled={true}
        pitchEnabled={true}
        maxZoomLevel={CONFIG.maxZoomLevel}
        minZoomLevel={CONFIG.minZoomLevel}
      >
        {/* Current user marker */}
        {userLocation && renderUserMarker(userLocation, true)}
        
        {/* Nearby users markers */}
        {nearbyUsers.map(user => renderUserMarker(user, false))}
      </MapView>
      
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SIZES.margin,
    fontSize: 16,
    color: COLORS.text,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default MapViewComponent; 