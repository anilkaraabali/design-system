import { useConstructor, usePrevious } from '@/hooks';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { Button, ButtonProps } from '../button';
import { IconTimes } from '../icons';
import { Portal } from '../portal/Portal';
import styles from './Drawer.module.scss';

type DrawerDirection = 'down' | 'left' | 'right' | 'up';

interface DrawerProps {
  animationDuration?: number;
  bindClose?: (close: () => void) => void;
  bindOpen?: (open: () => void) => void;
  containerClassName?: string;
  contentClassName?: string;
  documentBodyClassName?: string;
  fillEmptySpace?: boolean;
  header?: JSX.Element;
  headerClassName?: string;
  onClose?: () => void;
  onCloseButtonClick?: () => void;
  onClosing?: () => void;
  onOpen?: () => void;
  onOpening?: () => void;
  onOverlayClick?: () => void;
  openingDirection?: DrawerDirection;
  openOnLoad?: boolean;
  primaryAction?: ButtonProps;
  secondaryAction?: ButtonProps;
  showCloseButton?: boolean;
}

export const Drawer: React.FC<React.PropsWithChildren<DrawerProps>> = ({
  animationDuration = 200,
  bindClose,
  bindOpen,
  children,
  containerClassName,
  contentClassName,
  documentBodyClassName = 'drawer-block-overflow',
  fillEmptySpace = false,
  header,
  headerClassName,
  onClose,
  onCloseButtonClick,
  onClosing,
  onOpen,
  onOpening,
  onOverlayClick,
  openingDirection = 'up',
  openOnLoad = false,
  primaryAction,
  secondaryAction,
  showCloseButton = true,
}) => {
  const [closingDirection] = useState(() => {
    switch (openingDirection) {
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      case 'right':
        return 'left';
      case 'left':
        return 'right';
    }
  });

  const [directionClass] = useState(() => {
    switch (openingDirection) {
      case 'up':
        return 'drawer--bottom-to-top';
      case 'down':
        return 'drawer--top-to-bottom';
      case 'right':
        return 'drawer--left-to-right';
      case 'left':
        return 'drawer--right-to-left';
    }
  });

  const [open, setOpen] = useState(() => openOnLoad);
  const previousOpenStatus = usePrevious(open);

  const [animationDirection, setAnimationDirection] = useState(() =>
    openOnLoad ? openingDirection : closingDirection
  );
  const previousAnimationDirectionStatus = usePrevious(animationDirection);

  const timeout = useRef<NodeJS.Timeout | null>(null);

  useConstructor(() => {
    bindOpen?.(() => {
      setOpen(true);
      setAnimationDirection(openingDirection);
      timeout.current = setTimeout(() => {
        onOpen?.();
      }, animationDuration);
    });

    bindClose?.(() => {
      setAnimationDirection(closingDirection);
      timeout.current = setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    });
  });

  useEffect(() => {
    if (openOnLoad || (!openOnLoad && previousOpenStatus !== null)) {
      if (open) {
        document.body.classList.add(documentBodyClassName);
      } else {
        document.body.classList.remove(documentBodyClassName);
        onClose?.();
      }
    }

    return (): void => {
      document.body.classList.remove(documentBodyClassName);
    };
  }, [open]);

  useEffect(() => {
    if (previousAnimationDirectionStatus !== null) {
      if (animationDirection === closingDirection) {
        onClosing?.();
      } else {
        onOpening?.();
      }
    }
  }, [animationDirection]);

  if (!open) {
    return null;
  }

  return (
    <Portal rootId='drawer-root'>
      <div
        className={clsx(styles['drawer'], styles[directionClass], {
          [styles['drawer--closing']]: animationDirection !== openingDirection,
          [styles['drawer--fill-empty-space']]: fillEmptySpace,
          [styles['drawer--opening']]: animationDirection === openingDirection,
        })}
        style={{ animationDuration: `${animationDuration}ms` }}
      >
        <button
          className={styles['drawer__overlay']}
          onClick={() => {
            setAnimationDirection(closingDirection);
            timeout.current = setTimeout(() => {
              setOpen(false);
            }, animationDuration);
            onOverlayClick?.();
          }}
          type='button'
        />
        <section
          className={clsx(styles['drawer__container'], containerClassName)}
          style={
            {
              animationDuration: `${animationDuration}ms`,
            } as React.CSSProperties
          }
        >
          <header
            className={clsx(
              styles['drawer__header'],
              {
                [styles['drawer__header--with-border']]: header,
              },
              headerClassName
            )}
          >
            {header}
            {showCloseButton && (
              <Button
                className={styles['drawer__close-button']}
                icon={{
                  component: IconTimes,
                  position: 'prefix',
                }}
                onClick={() => {
                  setAnimationDirection(closingDirection);
                  timeout.current = setTimeout(() => {
                    setOpen(false);
                  }, animationDuration);
                  onCloseButtonClick?.();
                }}
                size='small'
              />
            )}
          </header>
          <main className={clsx(styles['drawer__content'], contentClassName)}>
            {children}
          </main>
          {(primaryAction || secondaryAction) && (
            <footer className={styles['drawer__footer']}>
              {secondaryAction && (
                <Button theme='link' {...secondaryAction}>
                  {secondaryAction.children}
                </Button>
              )}
              {primaryAction && (
                <Button theme='primary' {...primaryAction}>
                  {primaryAction.children}
                </Button>
              )}
            </footer>
          )}
        </section>
      </div>
    </Portal>
  );
};
