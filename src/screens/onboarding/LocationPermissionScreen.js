import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking
} from 'react-native';
import * as Location from 'expo-location';
import { COLORS, SIZES, ONBOARDING_MESSAGES } from '../../utils/constants';

const LocationPermissionScreen = ({ navigation }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestLocationPermission = async () => {
    setIsRequesting(true);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        // Permission granted, proceed to next screen
        navigation.navigate('GenderSelection');
      } else {
        // Permission denied
        Alert.alert(
          'Location Permission Required',
          'Location access is needed to show you nearby users and help you request assistance. You can enable it later in settings.',
          [
            {
              text: 'Continue Anyway',
              onPress: () => navigation.navigate('GenderSelection'),
              style: 'default'
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
              style: 'default'
            },
            {
              text: 'Cancel',
              style: 'cancel'
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert(
        'Error',
        'Failed to request location permission. Please try again.',
        [
          {
            text: 'Continue Anyway',
            onPress: () => navigation.navigate('GenderSelection')
          },
          {
            text: 'Try Again',
            onPress: () => setIsRequesting(false)
          }
        ]
      );
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Limited Functionality',
      'Without location access, you won\'t be able to see nearby users or request assistance. You can enable location access later in settings.',
      [
        {
          text: 'Continue Anyway',
          onPress: () => navigation.navigate('GenderSelection')
        },
        {
          text: 'Enable Location',
          onPress: requestLocationPermission
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{ONBOARDING_MESSAGES.location.title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_MESSAGES.location.subtitle}</Text>
        </View>

        {/* Location Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.locationIcon}>
            <Text style={styles.iconText}>📍</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            {ONBOARDING_MESSAGES.location.description}
          </Text>
        </View>

        {/* Benefits List */}
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>👥</Text>
            <Text style={styles.benefitText}>See nearby users who can help</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🆘</Text>
            <Text style={styles.benefitText}>Request assistance when needed</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🗺️</Text>
            <Text style={styles.benefitText}>Navigate to safe locations</Text>
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyContainer}>
          <Text style={styles.privacyTitle}>🔒 Your Privacy Matters</Text>
          <Text style={styles.privacyText}>
            Your location is only shared when you request assistance or choose to share it with trusted contacts.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, isRequesting && styles.disabledButton]}
            onPress={requestLocationPermission}
            disabled={isRequesting}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              {isRequesting ? 'Requesting...' : ONBOARDING_MESSAGES.location.permissionText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 3,
  },
  locationIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 50,
  },
  descriptionContainer: {
    marginBottom: SIZES.padding * 3,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  benefitsContainer: {
    marginBottom: SIZES.padding * 3,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: SIZES.padding,
    width: 30,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  privacyContainer: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding * 1.5,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.padding * 3,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  privacyText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  skipButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LocationPermissionScreen; 