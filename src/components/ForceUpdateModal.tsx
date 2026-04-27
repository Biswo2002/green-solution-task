import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { ZORRRO_COLORS } from '~/styles';

interface ForceUpdateModalProps {
  visible: boolean;
  latestVersion: string;
  currentVersion: string;
  updateType?: 'major' | 'minor' | 'patch' | null;
  storeUrl: string;
  onUpdatePress: () => void;
}

/**
 * Force Update Modal - Blocks app usage until user updates
 * 
 * This modal appears when a force update is required and prevents
 * users from using the app until they update to the latest version.
 */
const ForceUpdateModal: React.FC<ForceUpdateModalProps> = ({
  visible,
  latestVersion,
  currentVersion,
  updateType,
  storeUrl,
  onUpdatePress,
}) => {
  const updateTypeText = updateType
    ? ` (${updateType} update)`
    : '';

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      hardwareAccelerated
      statusBarTranslucent
      // Prevent dismissing by back button or gesture
      onRequestClose={() => {
        // Do nothing - force update cannot be dismissed
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Icon/Logo Area */}
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🔄</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Update Required</Text>

          {/* Message */}
          <Text style={styles.message}>
            A new version{updateTypeText} ({latestVersion}) is available.
          </Text>
          <Text style={styles.subMessage}>
            Please update to continue using the app.
          </Text>

          {/* Version Info */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionLabel}>Current Version:</Text>
            <Text style={styles.versionValue}>{currentVersion}</Text>
          </View>
          <View style={styles.versionContainer}>
            <Text style={styles.versionLabel}>Latest Version:</Text>
            <Text style={styles.versionValue}>{latestVersion}</Text>
          </View>

          {/* Update Button */}
          <TouchableOpacity
            style={styles.updateButton}
            onPress={onUpdatePress}
            activeOpacity={0.8}
          >
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>

          {/* Info Text */}
          <Text style={styles.infoText}>
            The app will open {Platform.OS === 'ios' ? 'App Store' : 'Play Store'}
            {'\n'}for you to update.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: ZORRRO_COLORS.primary.DEFAULT + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  subMessage: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  versionLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  versionValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: ZORRRO_COLORS.primary.DEFAULT,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: ZORRRO_COLORS.primary.DEFAULT,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 16,
  },
});

export default ForceUpdateModal;
