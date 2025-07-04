import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserProfileService from '../services/UserProfileService';
import { COLORS, SIZES, GENDER_OPTIONS } from '../utils/constants';

const SettingsScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const profile = await UserProfileService.getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleGenderChange = async (newGender) => {
    try {
      await UserProfileService.updateGender(newGender);
      setUserProfile(prev => ({ ...prev, gender: newGender }));
    } catch (error) {
      console.error('Error updating gender:', error);
      Alert.alert('Error', 'Failed to update gender setting');
    }
  };

  const handlePrivacyToggle = async (key) => {
    try {
      const newSettings = {
        ...userProfile.privacySettings,
        [key]: !userProfile.privacySettings[key]
      };
      await UserProfileService.updatePrivacySettings(newSettings);
      setUserProfile(prev => ({
        ...prev,
        privacySettings: newSettings
      }));
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      Alert.alert('Error', 'Failed to update privacy setting');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all your settings and data. You will need to complete onboarding again. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await UserProfileService.resetUserProfile();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } catch (error) {
              console.error('Error resetting profile:', error);
              Alert.alert('Error', 'Failed to reset data');
            }
          }
        }
      ]
    );
  };

  const renderToggleRow = (key, title, description) => (
    <View style={styles.toggleRow}>
      <View style={styles.toggleContent}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDescription}>{description}</Text>
      </View>
      <Switch
        value={userProfile?.privacySettings?.[key] || false}
        onValueChange={() => handlePrivacyToggle(key)}
        trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
        thumbColor={COLORS.white}
        ios_backgroundColor={COLORS.lightGray}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading settings...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Gender Identity</Text>
            <View style={styles.genderOptions}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.genderOption,
                    userProfile?.gender === option.id && styles.selectedGenderOption
                  ]}
                  onPress={() => handleGenderChange(option.id)}
                >
                  <Text style={[
                    styles.genderOptionText,
                    userProfile?.gender === option.id && styles.selectedGenderOptionText
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Text style={styles.sectionDescription}>
            Control who can see you on the map and respond to your requests.
          </Text>
          
          <Text style={styles.subsectionTitle}>Who can see me on the map</Text>
          {renderToggleRow(
            'visibleToMen',
            'Men can see me',
            'Allow men to see your location'
          )}
          {renderToggleRow(
            'visibleToWomen',
            'Women can see me',
            'Allow women to see your location'
          )}
          {renderToggleRow(
            'visibleToNonBinary',
            'Non-binary users can see me',
            'Allow non-binary users to see your location'
          )}

          <Text style={styles.subsectionTitle}>Who can respond to my requests</Text>
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

        {/* Reset Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Reset All Data</Text>
          </TouchableOpacity>
          <Text style={styles.resetDescription}>
            This will clear all your settings and data. You will need to complete onboarding again.
          </Text>
        </View>

        {/* Debug Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Debug & Testing</Text>
          <TouchableOpacity
            style={styles.debugButton}
            onPress={() => {
              Alert.alert(
                'Debug Info',
                `Onboarding Completed: ${userProfile?.hasCompletedOnboarding}\nUser ID: ${userProfile?.userId}\nGender: ${userProfile?.gender}\nCreated: ${userProfile?.createdAt}`,
                [{ text: 'OK' }]
              );
            }}
          >
            <Text style={styles.debugButtonText}>Show Debug Info</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.debugButton}
            onPress={() => {
              Alert.alert(
                'Restart Onboarding',
                'This will take you back to the onboarding flow without clearing your data.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Restart',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome' }],
                      });
                    }
                  }
                ]
              );
            }}
          >
            <Text style={styles.debugButtonText}>Restart Onboarding</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.debugButton}
            onPress={async () => {
              try {
                await UserProfileService.clearOnboardingStatus();
                Alert.alert(
                  'Onboarding Status Cleared',
                  'The app will now show onboarding for new users. Restart the app to see the effect.',
                  [
                    {
                      text: 'Restart App',
                      onPress: () => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Welcome' }],
                        });
                      }
                    },
                    { text: 'OK' }
                  ]
                );
              } catch (error) {
                Alert.alert('Error', 'Failed to clear onboarding status');
              }
            }}
          >
            <Text style={styles.debugButtonText}>Clear Onboarding Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  backButton: {
    padding: SIZES.margin,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  section: {
    marginBottom: SIZES.margin * 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  sectionDescription: {
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 24,
  },
  featureList: {
    marginTop: SIZES.margin,
  },
  featureItem: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  profileItem: {
    marginBottom: SIZES.padding,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    marginHorizontal: SIZES.margin / 2,
    alignItems: 'center',
  },
  selectedGenderOption: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  genderOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  selectedGenderOptionText: {
    color: COLORS.white,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
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
  resetButton: {
    backgroundColor: COLORS.emergency,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resetDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
  },
  debugButton: {
    backgroundColor: COLORS.gray,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.borderRadius,
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  debugButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen; 