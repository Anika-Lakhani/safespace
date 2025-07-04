import StorageService from './StorageService';
import { STORAGE_KEYS, PRIVACY_SETTINGS_DEFAULTS } from '../utils/constants';

class UserProfileService {
  /**
   * Create a new user profile
   * @param {string} gender - User's gender identity
   * @param {Object} privacySettings - User's privacy preferences
   * @returns {Promise<Object>} - Created user profile
   */
  static async createUserProfile(gender, privacySettings = PRIVACY_SETTINGS_DEFAULTS) {
    const userProfile = {
      hasCompletedOnboarding: true,
      userId: this.generateUserId(),
      gender,
      privacySettings,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString()
    };

    const success = await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, userProfile);
    if (success) {
      return userProfile;
    }
    throw new Error('Failed to create user profile');
  }

  /**
   * Get the current user profile
   * @returns {Promise<Object|null>} - User profile or null if not found
   */
  static async getUserProfile() {
    return await StorageService.getItem(STORAGE_KEYS.USER_PROFILE);
  }

  /**
   * Update user profile with new data
   * @param {Object} updates - Partial profile updates
   * @returns {Promise<Object>} - Updated user profile
   */
  static async updateUserProfile(updates) {
    const currentProfile = await this.getUserProfile();
    if (!currentProfile) {
      throw new Error('No user profile found');
    }

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      lastActiveAt: new Date().toISOString()
    };

    const success = await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, updatedProfile);
    if (success) {
      return updatedProfile;
    }
    throw new Error('Failed to update user profile');
  }

  /**
   * Update privacy settings
   * @param {Object} privacySettings - New privacy settings
   * @returns {Promise<Object>} - Updated user profile
   */
  static async updatePrivacySettings(privacySettings) {
    return await this.updateUserProfile({ privacySettings });
  }

  /**
   * Update user's gender identity
   * @param {string} gender - New gender selection
   * @returns {Promise<Object>} - Updated user profile
   */
  static async updateGender(gender) {
    return await this.updateUserProfile({ gender });
  }

  /**
   * Check if user has completed onboarding
   * @returns {Promise<boolean>} - Onboarding completion status
   */
  static async hasCompletedOnboarding() {
    const profile = await this.getUserProfile();
    return profile?.hasCompletedOnboarding || false;
  }

  /**
   * Reset user profile and clear all data
   * @returns {Promise<boolean>} - Success status
   */
  static async resetUserProfile() {
    const success = await StorageService.clear();
    return success;
  }

  /**
   * Clear onboarding status only (for testing)
   * @returns {Promise<boolean>} - Success status
   */
  static async clearOnboardingStatus() {
    const profile = await this.getUserProfile();
    if (profile) {
      const updatedProfile = {
        ...profile,
        hasCompletedOnboarding: false
      };
      const success = await StorageService.setItem(STORAGE_KEYS.USER_PROFILE, updatedProfile);
      return success;
    }
    return true; // No profile exists, so onboarding is already not completed
  }

  /**
   * Get user's privacy settings
   * @returns {Promise<Object>} - Current privacy settings
   */
  static async getPrivacySettings() {
    const profile = await this.getUserProfile();
    return profile?.privacySettings || PRIVACY_SETTINGS_DEFAULTS;
  }

  /**
   * Get user's gender identity
   * @returns {Promise<string|null>} - User's gender or null if not set
   */
  static async getGender() {
    const profile = await this.getUserProfile();
    return profile?.gender || null;
  }

  /**
   * Update last active timestamp
   * @returns {Promise<boolean>} - Success status
   */
  static async updateLastActive() {
    try {
      const profile = await this.getUserProfile();
      if (profile) {
        await this.updateUserProfile({ lastActiveAt: new Date().toISOString() });
      }
      return true;
    } catch (error) {
      console.error('Failed to update last active:', error);
      return false;
    }
  }

  /**
   * Generate a unique user ID
   * @returns {string} - Unique user ID
   */
  static generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Check if user profile exists
   * @returns {Promise<boolean>} - Whether user profile exists
   */
  static async profileExists() {
    const profile = await this.getUserProfile();
    return profile !== null;
  }
}

export default UserProfileService; 