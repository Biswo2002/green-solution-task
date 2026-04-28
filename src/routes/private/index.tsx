import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PrivateRoutesTypes } from './types';
import { TabLayout } from '../layout';
import {
} from './screenGroups';
import { Private } from '$/screens';
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
      <Stack.Screen name="ChannelsListening" component={Private?.ChannelsListening} />
      <Stack.Screen name="SosDetails" component={Private?.SosDetails} />
      <Stack.Screen name="ChatDetails" component={Private?.ChatDetails} />
      <Stack.Screen name="SharedMedia" component={Private?.SharedMedia} />
      <Stack.Screen name="UserProfile" component={Private?.UserProfile} />
      <Stack.Screen name="GroupProfile" component={Private?.GroupProfile} />
      <Stack.Screen name="GroupMembers" component={Private?.GroupMembers} />
    </Stack.Navigator>
  );
}
