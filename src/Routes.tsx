import React, { useCallback, useEffect, useState } from 'react';
import PrivateRoutes from './routes/private';
import { SplashScreen, PermissionsScreen } from './screens/public';
import AppStorage, { appStorageReady } from './utils/AppStorage';
import { STORAGE_KEYS } from './utils/storageKeys';

/** Keep splash visible for full intro duration before routing. */
const FIRST_LAUNCH_SPLASH_MIN_MS = 6000;

const Routes = () => {
  const [appState, setAppState] = useState<'splash' | 'permissions' | 'ready'>(
    'splash',
  );

  const completePermissionsOnboarding = useCallback(() => {
    setAppState('ready');
  }, []);

  useEffect(() => {
    let cancelled = false;

    const runBootstrap = async () => {
      const splashDelay = new Promise<void>(resolve => {
        setTimeout(resolve, FIRST_LAUNCH_SPLASH_MIN_MS);
      });

      await appStorageReady;
      if (cancelled) return;

      const permissionFlag = await AppStorage.getItemAsync(
        STORAGE_KEYS.CORE_PERMISSIONS_REQUESTED,
      );
      if (cancelled) return;

      await splashDelay;
      if (cancelled) return;

      if (permissionFlag === true) {
        setAppState('ready');
        return;
      }

      setAppState('permissions');
    };

    runBootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  if (appState === 'splash') {
    return <SplashScreen />;
  }

  if (appState === 'permissions') {
    return <PermissionsScreen onComplete={completePermissionsOnboarding} />;
  }

  return <PrivateRoutes />;
};

export default Routes;
