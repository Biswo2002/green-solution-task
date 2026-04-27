import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';

type ImageType = 'camera' | 'gallery';

const pickImage = (type: ImageType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const options: CameraOptions & ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };

    const callback = (response: any) => {
      if (response.didCancel) {
        reject(new Error('User cancelled'));
      } else if (response.errorMessage) {
        reject(new Error(response.errorMessage));
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          resolve(imageUri); // Return the URI of the selected image
        } else {
          reject(new Error('No valid image URI'));
        }
      } else {
        reject(new Error('No image selected'));
      }
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  });
};

export default pickImage;
