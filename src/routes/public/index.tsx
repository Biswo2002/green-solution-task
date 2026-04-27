import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Public } from '~/screens';
import { AppRoutesTypes, PublicRoutesTypes } from './types';

const Stack = createNativeStackNavigator<AppRoutesTypes>();

type PublicRouteProps = {
  initialRouteName?: keyof PublicRoutesTypes;
};

export default function PublicRoutes({
  initialRouteName = 'SplashScreen',
}: PublicRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as keyof AppRoutesTypes}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={Public.SplashScreen} />
    </Stack.Navigator>
  );
}
