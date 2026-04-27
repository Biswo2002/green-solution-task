import * as React from 'react';
import type {
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';
import { Logger } from '$/utils/logger';

// ---------------------------------------------------------------------------
// Refs
// ---------------------------------------------------------------------------

/** Tracks whether the NavigationContainer has finished mounting. */
export const isReadyRef: { current: boolean } = { current: false };

/** Stable ref to the NavigationContainer instance. */
export const navigationRef =
  React.createRef<NavigationContainerRef<ParamListBase>>();

// ---------------------------------------------------------------------------
// Pre-ready navigation queue
// ---------------------------------------------------------------------------

type QueuedNavAction = { name: string; params?: any };

/**
 * Holds navigate() calls that arrive before the NavigationContainer is ready.
 * Replayed in FIFO order by flushNavigationQueue().
 */
const navQueue: QueuedNavAction[] = [];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Type-safe navigation helper.
 *
 * - If the NavigationContainer is ready the call is dispatched immediately.
 * - Otherwise the action is queued and replayed once
 *   `flushNavigationQueue()` is called (typically in `onReady`).
 */
export function navigate<RouteName extends keyof ParamListBase>(
  name: RouteName,
  params?: ParamListBase[RouteName],
): void {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name as any, params);
  } else {
    // Navigator not ready yet — queue the action for replay.
    navQueue.push({ name: name as string, params });
    Logger.debug(`[Navigation] Queued "${name as string}" (navigator not ready)`);
  }
}

/**
 * Replays any navigate() calls that were queued before the navigator was
 * ready.  Call this inside the NavigationContainer `onReady` callback.
 */
export function flushNavigationQueue(): void {
  if (!navigationRef.current) return;
  while (navQueue.length > 0) {
    const action = navQueue.shift();
    if (action) {
      Logger.debug(`[Navigation] Flushing queued navigation to "${action.name}"`);
      navigationRef.current.navigate(action.name as any, action.params);
    }
  }
}
