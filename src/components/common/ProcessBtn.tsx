import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {
  GestureResponderEvent,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';
import { WIDTH } from '~/utils';

type ProcessBtnProps = {
  title: string;
  loading?: boolean;
  loadingText?: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isOther?: boolean;
  isNew?: boolean;
  disable?: boolean;
};

const ProcessBtn: React.FC<ProcessBtnProps> = ({
  title,
  loading = false,
  loadingText = 'Loading...',
  onPress,
  containerStyle,
  buttonStyle,
  textStyle,
  isOther,
  isNew,
  disable,
}) => {
  const gradientColors = loading || disable
    ? ['#B0B0B0', '#A0A0A0']
    : isOther
      ? [ZORRRO_COLORS?.primary?.DEFAULT, ZORRRO_COLORS?.primary?.DEFAULT]
      : isNew
        ? ['#015FE3', '#015FE3']
        : [ZORRRO_COLORS?.primary?.DEFAULT, ZORRRO_COLORS?.primary?.DEFAULT];

  return (
    <SafeAreaView
      style={[
        isOther
          ? {
            marginBottom: 47,
            alignSelf: 'center',
            borderRadius: 12,
          }
          : styles.container,
        containerStyle,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disable || loading}>
        <LinearGradient
          colors={gradientColors}
          style={[styles.button, buttonStyle]}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="small"
                color={ZORRRO_COLORS?.WHITE}
                style={{ marginRight: 8 }}
              />
              <Text style={[styles.buttonText, textStyle]}>{loadingText}</Text>
            </View>
          ) : (
            <Text
              style={
                isOther
                  ? {
                    color: ZORRRO_COLORS?.WHITE,
                    fontSize: 16,
                    fontFamily: ZORRRO_FONTS?.[700]?.normal,
                    textAlign: 'center',
                  }
                  : [styles.buttonText, textStyle]
              }>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ZORRRO_COLORS?.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  button: {
    justifyContent: 'center',
    height: 54,
    borderRadius: 12,
    width: WIDTH / 1.1,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  buttonText: {
    color: ZORRRO_COLORS?.WHITE,
    fontSize: 16,
    fontFamily: ZORRRO_FONTS?.[600]?.normal,
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProcessBtn;
