import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { ZORRRO_COLORS } from '~/styles';

type EmptyProps = {
  title: string;
  image?: ImageSourcePropType;
  subtitle: string;
  action?: {
    label: string;
    onPress: () => void;
  };
};

const Empty: React.FC<EmptyProps> = ({
  title,
  image,
  subtitle,
  action,
}) => {
  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={image}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {action ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: ZORRRO_COLORS.WHITE }]}
          onPress={action.onPress}
        >
          <Text style={styles.buttonText}>{action.label}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Empty;
