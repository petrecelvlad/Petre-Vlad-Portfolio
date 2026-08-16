/**
 * Centralized timeline orchestrator timings and animation constants.
 */
export const TIMELINE_CONFIG = {
  ANIMATION_DURATION_MS: 450,
  STEP_DELAY_MS: 120,
  DEBOUNCE_RESIZE_MS: 150,
  AUTO_PLAY_INTERVAL_MS: 3000,
  TRANSITION_EASE: [0.16, 1, 0.3, 1] as const,
} as const;
