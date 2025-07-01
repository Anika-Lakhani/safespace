import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert
} from 'react-native';
import { COLORS, SIZES, BUTTON_MODES } from '../utils/constants';

const AssistanceButton = ({ onPress, disabled = false, nearbyUsersCount = 0 }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    
    // For Phase 1: Single tap for assistance
    // For Phase 2: This will be modified to handle both tap and hold
    onPress(BUTTON_MODES.ASSISTANCE);
  };

  // Future: Add long press detection for emergency mode
  // const handleLongPress = () => {
  //   if (disabled) return;
  //   onPress(BUTTON_MODES.EMERGENCY);
  // };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            disabled && styles.disabledButton
          ]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={0.8}
          // onLongPress={handleLongPress} // For Phase 2
          // delayLongPress={5000} // 5 seconds for emergency
        >
          <Text style={styles.buttonText}>Request Assistance</Text>
          <Text style={styles.subText}>Tap to request help from nearby users</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Nearby Users: {nearbyUsersCount}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  button: {
    backgroundColor: COLORS.assistance,
    height: SIZES.buttonHeight,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: SIZES.margin,
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AssistanceButton; 