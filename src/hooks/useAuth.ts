import { useCallback, useState } from 'react';

export function useAuth() {
  const [isLoginTrue, setIsLoginTrue] = useState(false);
  const isLoggedIn = false;
  const isGuest = false;

  const initializeAuth = useCallback(async () => {
    // Restore session from storage in a full implementation
  }, []);

  return {
    isLoggedIn,
    isGuest,
    isLoginTrue,
    setIsLoginTrue,
    initializeAuth,
  };
}
