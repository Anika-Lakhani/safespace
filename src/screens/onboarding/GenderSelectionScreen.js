import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { COLORS, SIZES, ONBOARDING_MESSAGES, GENDER_OPTIONS } from '../../utils/constants';

const GenderSelectionScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender) {
      navigation.navigate('PrivacySettings', { selectedGender });
    }
  };

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
          <Text style={styles.title}>{ONBOARDING_MESSAGES.gender.title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_MESSAGES.gender.subtitle}</Text>
          <Text style={styles.description}>
            {ONBOARDING_MESSAGES.gender.description}
          </Text>
        </View>

        {/* Gender Options */}
        <View style={styles.optionsContainer}>
          {GENDER_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.genderOption,
                selectedGender === option.id && styles.selectedOption,
                { borderColor: option.color }
              ]}
              onPress={() => handleGenderSelect(option.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.markerPreview,
                { backgroundColor: option.color }
              ]}>
                <Text style={styles.markerText}>📍</Text>
              </View>
              <Text style={[
                styles.optionLabel,
                selectedGender === option.id && styles.selectedOptionLabel
              ]}>
                {option.label}
              </Text>
              {selectedGender === option.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedGender && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedGender}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              Continue
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
    marginBottom: SIZES.padding * 4,
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
    paddingHorizontal: SIZES.padding,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SIZES.padding * 3,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 1.5,
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedOption: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 3,
  },
  markerPreview: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
  },
  markerText: {
    fontSize: 24,
  },
  optionLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  selectedOptionLabel: {
    color: COLORS.primary,
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  continueButton: {
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
    backgroundColor: COLORS.gray,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GenderSelectionScreen; 