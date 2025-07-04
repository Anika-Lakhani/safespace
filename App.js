import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileService from './src/services/UserProfileService';
import OnboardingWelcomeScreen from './src/screens/onboarding/OnboardingWelcomeScreen';
import LocationPermissionScreen from './src/screens/onboarding/LocationPermissionScreen';
import GenderSelectionScreen from './src/screens/onboarding/GenderSelectionScreen';
import PrivacySettingsScreen from './src/screens/onboarding/PrivacySettingsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import LoadingScreen from './src/components/LoadingScreen';
import { COLORS } from './src/utils/constants';

const Stack = createStackNavigator();

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await UserProfileService.hasCompletedOnboarding();
      setHasCompletedOnboarding(completed);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setHasCompletedOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={hasCompletedOnboarding ? 'Home' : 'Welcome'}
      >
        {/* Onboarding Screens */}
        <Stack.Screen name="Welcome" component={OnboardingWelcomeScreen} />
        <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
        <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
        <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
        
        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
