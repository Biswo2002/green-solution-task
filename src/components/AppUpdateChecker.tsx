import React from 'react';
import { useAppUpdate } from '$/hooks';
import { Logger } from '$/utils/logger';
import UpdateModal from '$/components/core/UpdateModal';


interface AppUpdateCheckerProps {
  backendApiUrl?: string;
  forceUpdateVersions?: string[];
  checkOnMount?: boolean;
}

/**
 * App Update Checker Component
 * 
 * This component automatically checks for app updates and shows a modal
 * when a new version is available.
 * 
 * Usage:
 * ```tsx
 * <AppUpdateChecker 
 *   backendApiUrl="https://api.sportup.ai/api/v1/app/version"
 *   forceUpdateVersions={['1.0.0', '2.0.0']}
 * />
 * ```
 */
const AppUpdateChecker: React.FC<AppUpdateCheckerProps> = ({
  backendApiUrl,
  forceUpdateVersions = [],
  checkOnMount = true,
}) => {
  const {
    versionInfo,
    showUpdateModal,
    handleUpdate,
    handleCancel,
  } = useAppUpdate({
    checkOnMount,
    forceUpdateVersions,
    backendApiUrl,
    onUpdateAvailable: (info: { currentVersion: string; latestVersion: string }) => {
      if (__DEV__) {
        Logger.debug('Update available', {
          current: info.currentVersion,
          latest: info.latestVersion,
        });
      }
    },
    onUpdateRequired: (info: { currentVersion: string; latestVersion: string }) => {
      Logger.warn('Force update required', {
        current: info.currentVersion,
        latest: info.latestVersion,
      });
    },
  });

  if (!versionInfo || !showUpdateModal) {
    return null;
  }

  return (
    <UpdateModal
      visible={showUpdateModal}
      versionInfo={versionInfo}
      onUpdate={handleUpdate}
      onCancel={versionInfo.isForceUpdate ? undefined : handleCancel}
    />
  );
};

export default AppUpdateChecker;

