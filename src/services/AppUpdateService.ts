export type VersionInfo = {
  currentVersion: string;
  latestVersion: string;
  isForceUpdate: boolean;
  updateUrl: string;
  updateType?: string;
  storeUrl?: string;
};
