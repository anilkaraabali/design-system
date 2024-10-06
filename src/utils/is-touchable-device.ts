export const deviceIsTouchable = (): boolean => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  return false;
};
