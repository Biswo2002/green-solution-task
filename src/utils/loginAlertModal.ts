type LoginAlertPayload = {
  message?: string;
  onLogin?: () => void | Promise<void>;
};

type LoginAlertListener = (payload: LoginAlertPayload) => void;

const listeners = new Set<LoginAlertListener>();

export const subscribeLoginAlertModal = (listener: LoginAlertListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const showLoginAlertModal = (payload: LoginAlertPayload = {}) => {
  listeners.forEach(listener => listener(payload));
};

