import { StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
import Svg, { Defs, Rect, RadialGradient, Stop } from 'react-native-svg';
import React, { useEffect, useRef } from 'react';
import { getHeight, getWidth } from '$/components/helper';
import { ZorrroView, ZorrroText } from '$/components';
import ZORRRO_SVG from '$/assets/svg/svg';
import { ZORRRO_FONTS } from '$/styles';

const { width, height } = Dimensions.get('window');

const Splash: React.FC = () => {
  const mapOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 0-2s: only background
    // 2-4s: map fades in
    // 4-6s: logo/content fade in
    Animated.sequence([
      Animated.delay(2000),
      Animated.timing(mapOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [mapOpacity, contentOpacity]);

  return (
    <ZorrroView safe style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Radial Background */}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
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

      {/* Bengal Map */}
      <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
        <ZORRRO_SVG.BENGAL_MAP width={getWidth(343)} height={getHeight(579)} />
      </Animated.View>

      <ZorrroView style={styles.mainContent}>
        {/* Logo and Text */}
        <Animated.View style={[styles.logoContainer, { opacity: contentOpacity }]}>
          <ZorrroView style={styles.logoWrapper}>
            <ZORRRO_SVG.WB_LOGO width={getWidth(143)} height={getHeight(172)} />
          </ZorrroView>
          {/* <ZorrroText style={styles.title}>Chat App</ZorrroText> */}
        </Animated.View>
      </ZorrroView>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: contentOpacity }]}>
        <ZorrroText style={styles.footerText}>MDM CHAT AND SOS</ZorrroText>
      </Animated.View>
    </ZorrroView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#469BD6',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  logoWrapper: {
    marginBottom: 23,
  },
  title: {
    fontSize: 44,
    fontFamily: ZORRRO_FONTS[600].normal,
    color: '#0088C6',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    height: 80,
    backgroundColor: '#004B8D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});

export default Splash;