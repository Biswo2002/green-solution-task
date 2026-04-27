import { useState, useCallback, useEffect } from 'react';
import type { VersionInfo } from '~/services/AppUpdateService';

type UseAppUpdateOptions = {
  checkOnMount?: boolean;
  forceUpdateVersions?: string[];
  backendApiUrl?: string;
  onUpdateAvailable?: (info: {
    currentVersion: string;
    latestVersion: string;
  }) => void;
  onUpdateRequired?: (info: {
    currentVersion: string;
    latestVersion: string;
  }) => void;
};

/**
 * Fetches (optional) remote version info. Stub implementation until backend wiring is complete.
 */
export function useAppUpdate(options: UseAppUpdateOptions) {
  const { checkOnMount = true, backendApiUrl, onUpdateAvailable, onUpdateRequired, forceUpdateVersions = [] } =
    options;
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (!checkOnMount) {
      return;
    }
    if (!backendApiUrl) {
      return;
    }
    void (async () => {
      try {
        // Placeholder: replace with real version API response mapping.
        const current = '0.0.1';
        const latest = '0.0.1';
        const info: VersionInfo = {
          currentVersion: current,
          latestVersion: latest,
          isForceUpdate: forceUpdateVersions.includes(current),
          updateUrl: 'https://apps.apple.com',
        };
        if (latest !== current) {
          onUpdateAvailable?.({ currentVersion: current, latestVersion: latest });
          if (info.isForceUpdate) {
            onUpdateRequired?.({ currentVersion: current, latestVersion: latest });
          }
          setVersionInfo(info);
          setShowUpdateModal(true);
        }
      } catch {
        // ignore
      }
    })();
  }, [checkOnMount, backendApiUrl, onUpdateAvailable, onUpdateRequired, forceUpdateVersions]);

  const handleUpdate = useCallback(() => {
    setShowUpdateModal(false);
  }, []);

  const handleCancel = useCallback(() => {
    setShowUpdateModal(false);
  }, []);

  return {
    versionInfo,
    showUpdateModal,
    handleUpdate,
    handleCancel,
  };
}
