import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../utils/constants';

const SettingsScreen = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coming Soon</Text>
          <Text style={styles.sectionDescription}>
            Settings and configuration options will be available in Phase 2 of development.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planned Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Alert radius configuration</Text>
            <Text style={styles.featureItem}>• Privacy controls</Text>
            <Text style={styles.featureItem}>• Emergency contacts</Text>
            <Text style={styles.featureItem}>• Notification preferences</Text>
            <Text style={styles.featureItem}>• Account settings</Text>
          </View>
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
});

export default SettingsScreen; 