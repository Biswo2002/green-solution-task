import React, { useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';
import { PLAYMATE_IMAGES } from '~/assets';
import { getWidth } from './helper';

type Props = {
  hidden?: boolean;
};

const NetworkOfflineModal: React.FC<Props> = ({ hidden }) => {
  const [visible, setVisible] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setVisible(state.isConnected === false);
    });
    return () => unsubscribe();
  }, []);

  const handleRetry = useCallback(() => {
    setChecking(true);
    NetInfo.fetch()
      .then((state: NetInfoState) => {
        setVisible(state.isConnected === false);
      })
      .finally(() => setChecking(false));
  }, []);

  if (hidden || !visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image
            source={PLAYMATE_IMAGES?.empty?.NO_INTERNET}
            style={styles.illustration}
            resizeMode="contain"
          />
          <Text style={styles.title}>No internet connection</Text>
          <Text style={styles.subtitle}>
            Check your connection and refresh the app.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRetry}
            disabled={checking}
            activeOpacity={0.8}
          >
            {checking ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Refresh app</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.89)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#00000033',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    alignItems: 'center',
  },
  illustration: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: ZORRRO_FONTS?.[700]?.normal,
    color: '#0F172A',
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: ZORRRO_FONTS?.[500]?.normal,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 18,
    backgroundColor: ZORRRO_COLORS?.primary?.DEFAULT || '#103AFE',
    borderRadius: 12,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: getWidth(200),
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: ZORRRO_FONTS?.[600]?.normal,
  },
});

export default NetworkOfflineModal;
