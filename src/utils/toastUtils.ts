// utils/toastUtils.ts
import { useCallback, useEffect, useState } from 'react';

// Define allowed variants for the toast
export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

// Define the structure for toast data
export interface ToastData {
  visible: boolean;
  title: string;
  description: string;
  action: () => void;
  variant: ToastVariant;
  position: 'top' | 'middle' | 'bottom'; // Add position to toast data
}

const initialToastState: ToastData = {
  visible: false,
  title: '',
  description: '',
  action: () => {},
  variant: 'info',
  position: 'bottom',
};

let toastState: ToastData = initialToastState;
const listeners = new Set<(next: ToastData) => void>();
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const emitToastState = (next: ToastData) => {
  toastState = next;
  listeners.forEach(listener => listener(next));
};

const scheduleHide = (duration: number) => {
  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    emitToastState({ ...toastState, visible: false });
    hideTimer = null;
  }, duration);
};

export const showAppToast = (
  title: string,
  description: string,
  action: () => void = () => {},
  variant: ToastVariant = 'info',
  position: 'top' | 'middle' | 'bottom' = 'bottom',
  duration: number = 10000,
) => {
  emitToastState({
    visible: true,
    title,
    description,
    action,
    variant,
    position,
  });
  scheduleHide(duration);
};

export const hideAppToast = () => {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
  emitToastState({ ...toastState, visible: false });
};

// Custom hook to manage toast state
export const useToast = () => {
  const [toastData, setToastData] = useState<ToastData>(toastState);

  useEffect(() => {
    listeners.add(setToastData);
    return () => {
      listeners.delete(setToastData);
    };
  }, []);

  // Function to show the toast
  const showToast = useCallback((
    title: string,
    description: string,
    action: () => void = () => {},
    variant: ToastVariant = 'info',
    position: 'top' | 'middle' | 'bottom' = 'bottom',
    duration: number = 10000,
  ) => {
    showAppToast(title, description, action, variant, position, duration);
  }, []);

  // Function to hide the toast (manual close)
  const hideToast = useCallback(() => {
    hideAppToast();
  }, []);

  return { toastData, showToast, hideToast };
};
