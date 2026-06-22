import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PrivateRoutesTypes } from './types';
import { TabLayout } from '../layout';
import {} from './screenGroups';
import { Private } from '$/screens';
const Stack = createNativeStackNavigator<PrivateRoutesTypes>();
type PrivateRouteProps = {
  initialRouteName?: keyof PrivateRoutesTypes;
};

export default function PrivateRoutes({}: PrivateRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={'TabLayout'}
      screenOptions={{ headerShown: false }}
    >
      {/* Tab Layout Screens */}
      {/* <Stack.Screen name="TabLayout" component={TabLayout} /> */}
      <Stack.Screen name="Home" component={Private.Home} />
    </Stack.Navigator>
  );
}
