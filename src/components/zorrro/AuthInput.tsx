
import React, { useState } from 'react';
import {
  TouchableOpacity,
  TextInputProps,
  TextInput,
  Image,
  Text,
} from 'react-native';
import { PLAYMATE_ICONS } from '~/assets';
import { CountryPicker, ZorrroText, ZorrroView } from '~/components';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';

interface AuthInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  showCountryCode?: boolean;
  contentStyles?: object;
  isPassword?: boolean;
  error?: string;
  allowSpaces?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  placeholder,
  keyboardType = 'default',
  showCountryCode = false,
  contentStyles,
  isPassword = false,
  error,
  allowSpaces = false,
  ...props
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: 'IN',
    callingCode: ['91'],
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleCountrySelect = (country: any) => {
    setSelectedCountry({
      cca2: country.cca2,
      callingCode: country.callingCode,
    });
    setShowPicker(false);
  };

  return (
    <ZorrroView style={{ marginBottom: 20 }}>
      {/* Label */}
      <ZorrroText
        variant="heading"
        style={{
          color: ZORRRO_COLORS?.primary?.p2,
          fontSize: 14,
          fontFamily: ZORRRO_FONTS?.[600]?.normal,
          marginBottom: 6,
        }}
      >
        {label}
      </ZorrroText>

      {/* Input Container */}
      <ZorrroView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: error ? 'red' : '#D3D4DF', // highlight on error
          backgroundColor: ZORRRO_COLORS?.WHITE,
          height: 54,
          paddingHorizontal: 12,
        }}
      >
        {/* Country code picker */}
        {showCountryCode && (
          <TouchableOpacity
            accessible
            accessibilityLabel="Select country code"
            onPress={() => setShowPicker(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 8,
              borderRightWidth: 1,
              borderRightColor: '#D3D4DF',
              paddingRight: 10,
            }}
          >
            <Image
              source={{
                uri: `https://flagcdn.com/w40/${selectedCountry.cca2.toLowerCase()}.png`,
              }}
              style={{
                width: 20,
                height: 14,
                borderRadius: 3,
                marginRight: 8,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#222',
                fontFamily: ZORRRO_FONTS?.[400]?.normal,
              }}
            >
              +{selectedCountry.callingCode[0]}
            </Text>
          </TouchableOpacity>
        )}

        {/* Input field */}
        <TextInput
          placeholder={placeholder}
          keyboardType={isPassword ? 'default' : keyboardType}
          placeholderTextColor={'#B0B0B0'}
          {...props}
          secureTextEntry={isPassword && !isPasswordVisible}
          onChangeText={(text) => {
            // Allow spaces only if explicitly allowed (for name fields)
            // Prevent spaces for all other fields: password, mobile, email, etc.
            const processedText = allowSpaces ? text : text.replace(/\s/g, '');

            if (props.onChangeText) {
              props.onChangeText(processedText);
            }
          }}
          style={[
            {
              fontSize: 16,
              fontFamily: ZORRRO_FONTS?.[600]?.normal,
              color: ZORRRO_COLORS?.primary?.p2,
              flex: 1,
              padding: 0,
              margin: 0,
            },
            contentStyles,
          ]}
        />

        {/* Password visibility toggle */}
        {isPassword && (
          <TouchableOpacity
            accessible
            accessibilityLabel={
              isPasswordVisible ? 'Hide password' : 'Show password'
            }
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{ paddingHorizontal: 10 }}
          >
            <Image
              source={
                !isPasswordVisible
                  ? PLAYMATE_ICONS?.screen?.SHOW_PASSWORD
                  : PLAYMATE_ICONS?.screen?.HIDE_PASSWORD
              }
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
        )}
      </ZorrroView>

      {/* Inline error */}
      {error && (
        <ZorrroText
          variant="heading"
          style={{
            color: 'red',
            fontSize: 12,
            marginTop: 4,
            fontFamily: ZORRRO_FONTS?.[400]?.normal,
          }}
        >
          {error}
        </ZorrroText>
      )}

      {/* Render CountryPicker modal only if needed */}
      {showCountryCode && (
        <CountryPicker
          onClose={() => setShowPicker(false)}
          onSelect={handleCountrySelect}
          visible={showPicker}
        />
      )}
    </ZorrroView>
  );
};

export default AuthInput;
