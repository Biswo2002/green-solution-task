import { useState, useCallback, useEffect } from 'react';

type VersionInfoShape = {
  latestVersion: string;
  currentVersion: string;
  updateType: 'major' | 'minor' | 'patch';
  storeUrl: string;
};

type UseVersionCheckOptions = {
  checkOnMount?: boolean;
  checkDelay?: number;
  showAlert?: boolean;
  forceUpdate?: boolean;
  androidPackageName?: string;
};

export function useVersionCheck(_options: UseVersionCheckOptions) {
  const [versionInfo] = useState<VersionInfoShape | null>(null);
  const [isForceUpdateRequired] = useState(false);

  useEffect(() => {
    // Hook placeholder for app-store / play version checks.
  }, []);

  const openStore = useCallback(() => {
    // Linking to store in real implementation
  }, []);

  return { versionInfo, isForceUpdateRequired, openStore };
}
