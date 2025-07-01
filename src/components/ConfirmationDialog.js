import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { COLORS, SIZES, MESSAGES } from '../utils/constants';

const ConfirmationDialog = ({ visible, onClose, onConfirm, nearbyUsersCount }) => {
  const [additionalNote, setAdditionalNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      await onConfirm(additionalNote);
      setAdditionalNote('');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to send assistance request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setAdditionalNote('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <Text style={styles.title}>Request Assistance</Text>
          
          <Text style={styles.message}>
            {MESSAGES.assistanceRequest}
          </Text>
          
          <Text style={styles.nearbyUsers}>
            This will notify approximately {nearbyUsersCount} nearby users.
          </Text>

          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Additional Note (Optional):</Text>
            <TextInput
              style={styles.noteInput}
              placeholder="Describe what kind of help you need..."
              value={additionalNote}
              onChangeText={setAdditionalNote}
              multiline
              maxLength={200}
              placeholderTextColor={COLORS.gray}
            />
            <Text style={styles.charCount}>
              {additionalNote.length}/200
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                isLoading && styles.disabledButton
              ]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <Text style={styles.confirmButtonText}>
                {isLoading ? 'Sending...' : 'Request Help'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  dialog: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.padding * 1.5,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SIZES.margin,
    textAlign: 'center',
    lineHeight: 22,
  },
  nearbyUsers: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: SIZES.margin * 2,
    textAlign: 'center',
  },
  noteContainer: {
    marginBottom: SIZES.margin * 2,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.margin / 2,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius / 2,
    padding: SIZES.padding,
    fontSize: 14,
    color: COLORS.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: COLORS.gray,
    textAlign: 'right',
    marginTop: SIZES.margin / 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.margin,
  },
  button: {
    flex: 1,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.borderRadius / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
  },
  confirmButton: {
    backgroundColor: COLORS.assistance,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConfirmationDialog; 