import { useCallback } from 'react';

export function useLocation() {
  const getLocation = useCallback(() => {
    // Non-blocking: integrate Geolocation in a full implementation
  }, []);

  return { getLocation };
}
