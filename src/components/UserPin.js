import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../utils/constants';

const UserPin = ({ user, onPress, isCurrentUser = false }) => {
  const getPinColor = () => {
    if (isCurrentUser) return COLORS.primary;
    
    switch (user.gender) {
      case 'male':
        return COLORS.male;
      case 'female':
        return COLORS.female;
      case 'nonBinary':
        return COLORS.nonBinary;
      default:
        return COLORS.gray;
    }
  };

  const getPinSize = () => {
    return isCurrentUser ? 12 : 8;
  };

  return (
    <View
      style={[
        styles.pin,
        {
          backgroundColor: getPinColor(),
          width: getPinSize(),
          height: getPinSize(),
          borderRadius: getPinSize() / 2
        }
      ]}
      onTouchEnd={onPress}
    >
      {isCurrentUser && (
        <View style={styles.currentUserIndicator}>
          <View style={styles.currentUserDot} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  currentUserIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  currentUserDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.primary,
  }
});

export default UserPin; 