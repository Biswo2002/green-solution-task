import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
import { PLAYMATE_IMAGES } from '~/assets';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';
import ZorrroText from '../zorrro/ZorrroText';
import { subscribeLoginAlertModal } from '~/utils/loginAlertModal';
import ZorrroView from '../zorrro/ZorrroView';
import { getHeight, getWidth } from '../helper';
import BackdropBlur from './BackdropBlur';

const LoginAlertModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('Please Login');
  const [onLogin, setOnLogin] = useState<(() => void | Promise<void>) | undefined>();

  useEffect(() => {
    return subscribeLoginAlertModal(payload => {
      setMessage(payload?.message || 'Please Login');
      setOnLogin(() => payload?.onLogin);
      setVisible(true);
    });
  }, []);

  const handleCancel = () => setVisible(false);

  const handleLogin = async () => {
    setVisible(false);
    await onLogin?.();
  };

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={handleCancel}

    >
      <BackdropBlur blurType="light" blurAmount={15} style={styles.backdrop} />
      <TouchableWithoutFeedback onPress={handleCancel}>
        <ZorrroView style={styles.container}>
          <ZorrroView style={styles.card}>
            <ZorrroView style={styles.titlePill}>
              <ZorrroText style={styles.titlePillText}>Authentication Required</ZorrroText>
            </ZorrroView>

            <Image
              source={PLAYMATE_IMAGES?.AUTH_REQUIRED}
              style={styles.image}
              resizeMode="contain"
            />

            <ZorrroText style={styles.message}>{message}</ZorrroText>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
                <ZorrroText style={styles.cancelText}>Cancel</ZorrroText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <ZorrroText style={styles.loginText}>Login</ZorrroText>
              </TouchableOpacity>
            </View>
          </ZorrroView>
        </ZorrroView>
      </TouchableWithoutFeedback>

    </Modal>
  );
};

export default LoginAlertModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  card: {
    width: '100%',
    maxWidth: getWidth(360),
    borderRadius: getWidth(24),
    backgroundColor: ZORRRO_COLORS.WHITE,
    paddingHorizontal: getWidth(24),
    paddingTop: getHeight(16),
    paddingBottom: getHeight(18),
    alignItems: 'center',
    overflow: 'hidden',
  },
  titlePill: {
    backgroundColor: '#E7ECFF',
    borderRadius: 999,
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(6),
    marginBottom: getHeight(12),
  },
  titlePillText: {
    fontSize: 16,
    color: ZORRRO_COLORS.primary?.DEFAULT,
    fontFamily: ZORRRO_FONTS[600].normal,
    textAlign: 'center',
  },
  image: {
    width: getWidth(280),
    height: getHeight(180),
    marginBottom: getHeight(12),
  },
  message: {
    fontSize: 16,
    fontFamily: ZORRRO_FONTS[500].normal,
    color: '#6F7D90',
    marginBottom: getHeight(16),
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6F7D90',
    borderRadius: getWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: getHeight(44),
  },
  loginBtn: {
    flex: 1,
    borderRadius: getWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ZORRRO_COLORS.primary.DEFAULT,
    height: getHeight(44),
    marginLeft: getWidth(12),
  },
  cancelText: {
    fontSize: 16,
    color: '#6A6A6A',
    fontFamily: ZORRRO_FONTS[500].normal,
  },
  loginText: {
    fontSize: 16,
    color: ZORRRO_COLORS.WHITE,
    fontFamily: ZORRRO_FONTS[600].normal,
  },
});

