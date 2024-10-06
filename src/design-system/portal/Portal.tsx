import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  rootId?: string;
}

export const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({
  children,
  rootId = 'portal-root',
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    rootRef.current = document.createElement('div');
    rootRef.current.setAttribute('data-react-portal', 'true');
    rootRef.current.setAttribute('id', rootId);
    document.body.appendChild(rootRef.current);

    setMounted(true);

    return (): void => {
      rootRef.current?.remove();
    };
  }, []);

  if (!mounted || !rootRef.current) {
    return null;
  }

  return <>{createPortal(<>{children}</>, rootRef.current)}</>;
};
