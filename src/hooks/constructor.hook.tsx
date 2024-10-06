import { useEffect, useRef } from 'react';

export const useConstructor = (fn: () => (() => void) | void): void => {
  const hasBeenCalledRef = useRef(false);
  const unmountRef = useRef<() => (() => void) | void>(() => undefined);

  useEffect(
    () => (): void => {
      if (unmountRef.current) {
        unmountRef.current();
      }
    },
    []
  );

  if (hasBeenCalledRef.current) {
    return;
  }

  const unmount = fn();
  if (unmount) {
    unmountRef.current = unmount;
  }
  hasBeenCalledRef.current = true;
};
