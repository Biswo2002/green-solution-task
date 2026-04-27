import { Image } from 'react-native';

const prefetchedUrls = new Set<string>();

export const prefetchRemoteUrls = (urls: Array<string | null | undefined>, limit = 6) => {
  urls
    .filter((url): url is string => typeof url === 'string' && url.length > 0)
    .slice(0, limit)
    .forEach(url => {
      if (prefetchedUrls.has(url)) return;
      prefetchedUrls.add(url);
      Image.prefetch(url).catch(() => {
        prefetchedUrls.delete(url);
      });
    });
};

