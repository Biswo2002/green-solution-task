import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PrivateRoutesTypes } from './types';
import { TabLayout } from '../layout';
import {
} from './screenGroups';
const Stack = createNativeStackNavigator<PrivateRoutesTypes>();
type PrivateRouteProps = {
  initialRouteName?: keyof PrivateRoutesTypes;
};

export default function PrivateRoutes({ }: PrivateRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={'TabLayout'}
      screenOptions={{ headerShown: false }}
    >
      {/* Tab Layout Screens */}
      <Stack.Screen name="TabLayout" component={TabLayout} />
    </Stack.Navigator>
  );
}
