import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

interface ModalComponentProps {
  showModal: boolean;
  setShowModal: (isVisible: boolean) => void;
  children?: ReactNode;
  ModalContentColor?: string;
  showCloseButton?: boolean;
}

const { width, height } = Dimensions.get('window');

const ModalComponent: React.FC<ModalComponentProps> = ({
  showModal,
  setShowModal,
  children,
  ModalContentColor,
  showCloseButton = true,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Content */}
      <View style={styles.container}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: ModalContentColor || '#fff' },
          ]}
        >
          {showCloseButton && (
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 10,
    padding: 16,
    minWidth: width * 0.8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  closeText: {
    color: '#0046FF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
  },
});
