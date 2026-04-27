import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { VersionInfo } from '~/services/AppUpdateService';
import { ZORRRO_COLORS } from '~/styles';

interface UpdateModalProps {
  visible: boolean;
  versionInfo: VersionInfo;
  onUpdate: () => void;
  onCancel?: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  versionInfo,
  onUpdate,
  onCancel,
}) => {
  const { latestVersion, isForceUpdate } = versionInfo;

  const handleUpdate = async () => {
    try {
      const url = versionInfo.updateUrl;
      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
      }
      onUpdate();
    } catch (error) {
      console.error('Error opening store:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={isForceUpdate ? undefined : onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔄</Text>
          </View>
          
          <Text style={styles.title}>
            {isForceUpdate ? 'Update Required' : 'Update Available'}
          </Text>
          
          <Text style={styles.message}>
            {isForceUpdate
              ? `A new version (${latestVersion}) is available. Please update to continue using the app.`
              : `A new version (${latestVersion}) is available. Would you like to update now?`}
          </Text>

          <View style={styles.buttonContainer}>
            {!isForceUpdate && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.cancelButtonText}>Later</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.button, styles.updateButton]}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>Update Now</Text>
            </TouchableOpacity>
          </View>

          {Platform.OS === 'android' && (
            <Text style={styles.note}>
              The update will be downloaded from Google Play Store
            </Text>
          )}
          
          {Platform.OS === 'ios' && (
            <Text style={styles.note}>
              The update will be downloaded from App Store
            </Text>
          )}
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
    padding: 20,
  },
  container: {
    backgroundColor: ZORRRO_COLORS.WHITE,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
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
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#007AFF',
  },
  updateButtonText: {
    color: ZORRRO_COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default UpdateModal;

