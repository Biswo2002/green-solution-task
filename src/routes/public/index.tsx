import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Public } from '~/screens';
import { AppRoutesTypes, PublicRoutesTypes } from './types';

const Stack = createNativeStackNavigator<AppRoutesTypes>();

type PublicRouteProps = {
  initialRouteName?: keyof PublicRoutesTypes;
};

export default function PublicRoutes({
  initialRouteName = 'ProductListening',
}: PublicRouteProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName as keyof AppRoutesTypes}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ProductListening"
        component={Public.ProductListening}
      />
      <Stack.Screen name="ProductDetails" component={Public.ProductDetails} />
    </Stack.Navigator>
  );
}
