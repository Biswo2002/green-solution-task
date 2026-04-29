import React, { useEffect, useState } from 'react';
import PrivateRoutes from './routes/private';
import { SplashScreen, PermissionsScreen } from './screens/public';
import AppStorage, { appStorageReady } from './utils/AppStorage';
import { STORAGE_KEYS } from './utils/storageKeys';

const Routes = () => {
  const [appState, setAppState] = useState<'splash' | 'permissions' | 'ready'>('splash');

  useEffect(() => {
    const initializeApp = async () => {
      // Wait for storage to hydrate
      await appStorageReady;

      // Ensure splash shows for at least 6 seconds as per previous design
      setTimeout(() => {
        const hasRequestedPermissions = AppStorage.getItem(STORAGE_KEYS.CORE_PERMISSIONS_REQUESTED) === true;
        if (hasRequestedPermissions) {
          setAppState('ready');
        } else {
          setAppState('permissions');
        }
      }, 6000);
    };

    initializeApp();
  }, []);

  if (appState === 'splash') {
    return <SplashScreen />;
  }

  // if (appState === 'permissions') {
  //   return <PermissionsScreen onComplete={() => setAppState('ready')} />;
  // }

  return <PrivateRoutes />;
};

export default Routes;
