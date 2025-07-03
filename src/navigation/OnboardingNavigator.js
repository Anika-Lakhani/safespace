import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingWelcomeScreen from '../screens/onboarding/OnboardingWelcomeScreen';
import LocationPermissionScreen from '../screens/onboarding/LocationPermissionScreen';
import GenderSelectionScreen from '../screens/onboarding/GenderSelectionScreen';
import PrivacySettingsScreen from '../screens/onboarding/PrivacySettingsScreen';

const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false, // Prevent swipe back during onboarding
      }}
    >
      <Stack.Screen 
        name="Welcome" 
        component={OnboardingWelcomeScreen}
      />
      <Stack.Screen 
        name="LocationPermission" 
        component={LocationPermissionScreen}
      />
      <Stack.Screen 
        name="GenderSelection" 
        component={GenderSelectionScreen}
      />
      <Stack.Screen 
        name="PrivacySettings" 
        component={PrivacySettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator; 