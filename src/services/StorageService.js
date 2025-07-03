import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  /**
   * Store a value in AsyncStorage
   * @param {string} key - The storage key
   * @param {any} value - The value to store (will be JSON stringified)
   * @returns {Promise<boolean>} - Success status
   */
  static async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('StorageService.setItem error:', error);
      return false;
    }
  }

  /**
   * Retrieve a value from AsyncStorage
   * @param {string} key - The storage key
   * @returns {Promise<any>} - The stored value or null if not found
   */
  static async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('StorageService.getItem error:', error);
      return null;
    }
  }

  /**
   * Remove a specific item from AsyncStorage
   * @param {string} key - The storage key to remove
   * @returns {Promise<boolean>} - Success status
   */
  static async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('StorageService.removeItem error:', error);
      return false;
    }
  }

  /**
   * Clear all data from AsyncStorage
   * @returns {Promise<boolean>} - Success status
   */
  static async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('StorageService.clear error:', error);
      return false;
    }
  }

  /**
   * Get all keys from AsyncStorage
   * @returns {Promise<string[]>} - Array of storage keys
   */
  static async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('StorageService.getAllKeys error:', error);
      return [];
    }
  }

  /**
   * Check if a key exists in AsyncStorage
   * @param {string} key - The storage key to check
   * @returns {Promise<boolean>} - Whether the key exists
   */
  static async hasKey(key) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys.includes(key);
    } catch (error) {
      console.error('StorageService.hasKey error:', error);
      return false;
    }
  }
}

export default StorageService; 