import { useCallback } from 'react';

export function useOpenMap() {
  return useCallback((lat: number, lng: number, label?: string) => {
    void lat;
    void lng;
    void label;
  }, []);
}
