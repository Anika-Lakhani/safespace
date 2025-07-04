import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import UserProfileService from '../../services/UserProfileService';
import { COLORS, SIZES, ONBOARDING_MESSAGES, PRIVACY_SETTINGS_DEFAULTS } from '../../utils/constants';

const PrivacySettingsScreen = ({ navigation, route }) => {
  const { selectedGender } = route.params;
  const [privacySettings, setPrivacySettings] = useState(PRIVACY_SETTINGS_DEFAULTS);
  const [isCreating, setIsCreating] = useState(false);

  const handleToggle = (key) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCompleteSetup = async () => {
    setIsCreating(true);
    
    try {
      await UserProfileService.createUserProfile(selectedGender, privacySettings);
      // Navigate to the main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
      Alert.alert(
        'Setup Error',
        'Failed to complete setup. Please try again.',
        [
          {
            text: 'Try Again',
            onPress: () => setIsCreating(false)
          }
        ]
      );
    }
  };

  const renderToggleRow = (key, title, description) => (
    <View style={styles.toggleRow}>
      <View style={styles.toggleContent}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDescription}>{description}</Text>
      </View>
      <Switch
        value={privacySettings[key]}
        onValueChange={() => handleToggle(key)}
        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.lightGray}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{ONBOARDING_MESSAGES.privacy.title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_MESSAGES.privacy.subtitle}</Text>
          <Text style={styles.description}>
            {ONBOARDING_MESSAGES.privacy.description}
          </Text>
        </View>

        {/* Privacy Settings */}
        <View style={styles.settingsContainer}>
          {/* Visibility Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {ONBOARDING_MESSAGES.privacy.visibilityTitle}
            </Text>
            {renderToggleRow(
              'visibleToMen',
              'Men can see me',
              'Allow men to see your location on the map'
            )}
            {renderToggleRow(
              'visibleToWomen',
              'Women can see me',
              'Allow women to see your location on the map'
            )}
            {renderToggleRow(
              'visibleToNonBinary',
              'Non-binary users can see me',
              'Allow non-binary users to see your location on the map'
            )}
          </View>

          {/* Assistance Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {ONBOARDING_MESSAGES.privacy.assistanceTitle}
            </Text>
            {renderToggleRow(
              'canReceiveRequestsFromMen',
              'Men can respond to my requests',
              'Allow men to respond to your assistance requests'
            )}
            {renderToggleRow(
              'canReceiveRequestsFromWomen',
              'Women can respond to my requests',
              'Allow women to respond to your assistance requests'
            )}
            {renderToggleRow(
              'canReceiveRequestsFromNonBinary',
              'Non-binary users can respond to my requests',
              'Allow non-binary users to respond to your assistance requests'
            )}
          </View>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Text style={styles.privacyNoteTitle}>🔒 Privacy First</Text>
          <Text style={styles.privacyNoteText}>
            Your location is only shared when you actively request assistance. 
            You can change these settings anytime in the app settings.
          </Text>
        </View>

        {/* Complete Setup Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.completeButton, isCreating && styles.disabledButton]}
            onPress={handleCompleteSetup}
            disabled={isCreating}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>
              {isCreating ? 'Setting up...' : 'Complete Setup'}
            </Text>
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
  backButtonContainer: {
    paddingHorizontal: SIZES.padding * 1.5,
    paddingTop: SIZES.padding,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
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
    marginBottom: SIZES.padding,
  },
  description: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  settingsContainer: {
    flex: 1,
    marginBottom: SIZES.padding * 2,
  },
  section: {
    marginBottom: SIZES.padding * 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  toggleContent: {
    flex: 1,
    marginRight: SIZES.padding,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 18,
  },
  privacyNote: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding * 1.5,
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.padding * 2,
  },
  privacyNoteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  privacyNoteText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  completeButton: {
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
  disabledButton: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PrivacySettingsScreen; 