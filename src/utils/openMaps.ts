import { Linking, Platform } from 'react-native';

type OpenMapsOptions = {
  destinationLabel?: string;
  destinationLat?: number;
  destinationLng?: number;
  originLat?: number;
  originLng?: number;
};

const buildDestination = ({
  destinationLabel,
  destinationLat,
  destinationLng,
}: OpenMapsOptions) => {
  if (
    typeof destinationLat === 'number' &&
    typeof destinationLng === 'number'
  ) {
    return `${destinationLat},${destinationLng}`;
  }

  if (destinationLabel) {
    return encodeURIComponent(destinationLabel);
  }

  return '';
};

export const openInMapsApp = async ({
  destinationLabel,
  destinationLat,
  destinationLng,
  originLat,
  originLng,
}: OpenMapsOptions) => {
  const destination = buildDestination({
    destinationLabel,
    destinationLat,
    destinationLng,
  });
  const originAvailable =
    typeof originLat === 'number' && typeof originLng === 'number';

  try {
    if (Platform.OS === 'ios') {
      const base =
        originAvailable && destination
          ? `maps://maps.apple.com/?saddr=${originLat},${originLng}&daddr=${destination}`
          : destination
          ? `maps://maps.apple.com/?daddr=${destination}`
          : `maps://maps.apple.com/?q=${encodeURIComponent(
              destinationLabel ?? 'Venue',
            )}`;

      const fallback = base.replace('maps://', 'https://');
      const canOpenMapsScheme = await Linking.canOpenURL('maps://');
      await Linking.openURL(canOpenMapsScheme ? base : fallback);
      return;
    }

    const origin = originAvailable ? `${originLat},${originLng}` : undefined;
    const googleUrl = origin
      ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
      : `https://www.google.com/maps/search/?api=1&query=${destination}`;
    await Linking.openURL(googleUrl);
  } catch (error) {
    throw error;
  }
};

export default openInMapsApp;

