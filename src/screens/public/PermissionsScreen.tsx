import React, { memo, useCallback, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { requestCustomPermissions } from 'mdm-permissions';
import { ZorrroView, ZorrroText, ScreenStatusBar } from '$/components';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '$/styles';
import { getHeight, getMargin, getWidth } from '$/components/helper';
import AppStorage from '$/utils/AppStorage';
import { STORAGE_KEYS } from '$/utils/storageKeys';
import ZORRRO_SVG from '$/assets/svg/svg';
import Svg, { Defs, Rect, RadialGradient, Stop } from 'react-native-svg';

const PERMISSION_ITEMS = [
  {
    title: 'Camera',
    desc: 'To take photos and videos for sharing in chats.',
  },
  {
    title: 'Microphone',
    desc: 'To record voice messages and make calls.',
  },
  {
    title: 'Photos & Storage',
    desc: 'To save and share media files with your contacts.',
  },
  {
    title: 'Notifications',
    desc: 'To keep you updated with new messages and SOS alerts.',
  },
];



export default function PermissionsScreen({
  onComplete,
}: {
  onComplete: () => void | Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const finishPermissions = useCallback(async () => {
    const key = STORAGE_KEYS.CORE_PERMISSIONS_REQUESTED;
    await AppStorage.setItem(key, true);
    let stored = await AppStorage.getItemAsync(key);
    if (stored !== true) {
      await AppStorage.setItem(key, true);
      stored = await AppStorage.getItemAsync(key);
    }
    if (stored !== true) {
      console.warn('CORE_PERMISSIONS_REQUESTED could not be persisted; onboarding may show again.');
    }
    await Promise.resolve(onComplete());
  }, [onComplete]);

  const handleRequestPermissions = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      await requestCustomPermissions();
      await finishPermissions();
    } catch (err) {
      console.warn(err);
      await finishPermissions();
    } finally {
      setLoading(false);
    }
  }, [finishPermissions, loading]);

  return (
    <ZorrroView safe style={styles.container}>
      <ScreenStatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      {/* Render once behind content for smoother scroll */}
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="bgGradient"
            cx="49.87%"
            cy="40.7%"
            rx="137%"
            ry="42%"
            fx="49.87%"
            fy="40.7%"
          >
            <Stop offset="0%" stopColor="#FBFDFF" />
            <Stop offset="100%" stopColor="#469BD6" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#bgGradient)" />
      </Svg>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ZorrroView style={styles.content}>
          <ZorrroView style={styles.header}>
            <ZORRRO_SVG.WB_LOGO width={getWidth(80)} height={getHeight(96)} />
            <ZorrroText style={styles.title}>App Permissions</ZorrroText>
            <ZorrroText style={styles.subtitle}>
              To improve your chat and SOS experience, you can allow the following permissions now or enable them later in Settings:
            </ZorrroText>
          </ZorrroView>

          <ZorrroView style={styles.permissionsList}>
            {PERMISSION_ITEMS.map((item) => (
              <PermissionItem key={item.title} title={item.title} desc={item.desc} />
            ))}
          </ZorrroView>
        </ZorrroView>
        <ZorrroView style={styles.footer}>
          <Pressable
            onPress={handleRequestPermissions}
            disabled={loading}
            style={({ pressed }) => [
              styles.continueButton,
              loading && styles.continueButtonDisabled,
              pressed && !loading && styles.continueButtonPressed,
            ]}
          >
            <ZorrroText style={styles.continueText}>
              {loading ? 'Requesting...' : 'Continue'}
            </ZorrroText>
          </Pressable>
          <ZorrroText style={styles.skipText} onPress={finishPermissions}>
            Continue Without Permissions
          </ZorrroText>

        </ZorrroView>
      </ScrollView>

    </ZorrroView>
  );
}

const PermissionItem = memo(({ title, desc }: { title: string; desc: string }) => (
  <ZorrroView style={styles.itemContainer}>
    <ZorrroView style={styles.itemIcon}>
      <ZorrroText style={styles.iconText}>•</ZorrroText>
    </ZorrroView>
    <ZorrroView style={styles.itemTextContainer}>
      <ZorrroText style={styles.itemTitle}>{title}</ZorrroText>
      <ZorrroText style={styles.itemDesc}>{desc}</ZorrroText>
    </ZorrroView>
  </ZorrroView>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#469BD6',
  },
  content: {
    flex: 1,
    paddingHorizontal: getMargin(20),
    paddingTop: getHeight(60),
  },
  header: {
    alignItems: 'center',
    marginBottom: getHeight(40),
  },
  title: {
    fontSize: 24,
    fontFamily: ZORRRO_FONTS[600].normal,
    color: '#004B8D',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: ZORRRO_FONTS[400].normal,
    color: '#004B8D',
    textAlign: 'center',
    lineHeight: 22,
  },
  permissionsList: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 16,
    borderRadius: 12,
  },
  itemIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    color: '#004B8D',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: ZORRRO_FONTS[600].normal,
    color: '#004B8D',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 13,
    fontFamily: ZORRRO_FONTS[400].normal,
    color: '#004B8D',
    lineHeight: 18,
  },
  footer: {
    paddingBottom: getHeight(40),
  },
  continueButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: getMargin(24),
  },
  continueButtonDisabled: {
    opacity: 0.7,
  },
  continueButtonPressed: {
    opacity: 0.85,
  },
  continueText: {
    color: ZORRRO_COLORS.WHITE,
    fontSize: 16,
    fontFamily: ZORRRO_FONTS[600].normal,
    textAlign: 'center',
  },

  skipText: {
    textAlign: 'center',
    color: '#171D26',
    marginTop: 16,
    fontSize: 14,
    fontFamily: ZORRRO_FONTS[500].normal,
  },
});
