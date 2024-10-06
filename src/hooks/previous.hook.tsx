import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): null | T {
  const ref = useRef<null | T>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
