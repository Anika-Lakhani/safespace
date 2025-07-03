import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { COLORS, SIZES, ONBOARDING_MESSAGES } from '../../utils/constants';

const OnboardingWelcomeScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('LocationPermission');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Branding Area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>🛡️</Text>
          </View>
          <Text style={styles.appName}>SafeSpace</Text>
          <Text style={styles.tagline}>Your personal safety companion</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{ONBOARDING_MESSAGES.welcome.title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_MESSAGES.welcome.subtitle}</Text>
          <Text style={styles.description}>
            {ONBOARDING_MESSAGES.welcome.description}
          </Text>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📍</Text>
            <Text style={styles.featureText}>Real-time location sharing</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🆘</Text>
            <Text style={styles.featureText}>Emergency assistance button</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👥</Text>
            <Text style={styles.featureText}>Community safety network</Text>
          </View>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding * 2,
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 3,
    marginBottom: SIZES.padding * 4,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  logoText: {
    fontSize: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.padding / 2,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  messageContainer: {
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
    marginBottom: SIZES.padding,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: SIZES.padding * 4,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: SIZES.padding,
    width: 30,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  getStartedButton: {
    backgroundColor: COLORS.primary,
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingWelcomeScreen; 