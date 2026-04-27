type Listener = () => void;

const listeners = new Set<Listener>();

export const onDeepLinkTokenReceived = (fn: Listener): (() => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const emitDeepLinkTokenReceived = (): void => {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // Intentionally swallow listener errors to keep bus resilient.
    }
  });
};

// ---- Public game deep-link bus ----

const publicGameListeners = new Set<Listener>();

export const onPublicGameLinkReceived = (fn: Listener): (() => void) => {
  publicGameListeners.add(fn);
  return () => {
    publicGameListeners.delete(fn);
  };
};

export const emitPublicGameLinkReceived = (): void => {
  publicGameListeners.forEach((fn) => {
    try {
      fn();
    } catch {
      // Intentionally swallow listener errors to keep bus resilient.
    }
  });
};
