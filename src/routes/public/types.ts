import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth, Public } from '../../screens';

export type PublicRoutesTypes = {
  [key in keyof typeof Public]: undefined;
} & { [key in keyof typeof Auth]: undefined } & {
  PublicGamePreview: { gameId?: string };
  InvitePreview: { token?: string };
};

type OmittedScreens =
  | 'ForgetPasswordVerified'
  | 'ResetPassword'
  | 'ProductDetails';

export type AppRoutesTypes = Omit<PublicRoutesTypes, OmittedScreens> & {
  ForgetPasswordVerified: { phoneNumber?: string; otp?: string };
  ResetPassword: {
    resetToken?: String;
  };
  ProductDetails: {
    id: string;
  };
};

export type PublicNavigationProps = NativeStackNavigationProp<AppRoutesTypes>;
