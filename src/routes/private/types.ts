import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Private } from '../../screens';
import { PublicNavigationProps } from '../public/types';

export type BottomTabsTypes = {
  Feeds: undefined;
};

export type GymClassSelection = {
  id: string;
  title: string;
  pricePerMonth: number;
  scheduleLabel: string;
};

type PrivateScreens = {
  [key in keyof typeof Private]: undefined;
};

type OmittedScreens = '';

export type PrivateNavigationProp = Omit<PrivateScreens, OmittedScreens> & {

};

export type PrivateRoutesTypes = {
  // TabLayout: undefined;
  TabLayout: {
    screen?: 'MainLanding' | 'Bookings' | 'QuickMatches' | 'Profile';
  };
} & PrivateNavigationProp;
// export type PrivateRoutesTypes = {
//   BottomTab: undefined;
// } & PrivateNavigationProp;

export type PrivateScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsTypes>,
  NativeStackNavigationProp<PrivateRoutesTypes>
>;

export type AllScreensParamList = PublicNavigationProps & PrivateScreenProps;
