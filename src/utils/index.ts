import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

export type DocumentType = {
  name: string;
  size: number;
  type: string;
  uri: string;
  key: string;
};

export type DocumentPickerType = DocumentType[];
