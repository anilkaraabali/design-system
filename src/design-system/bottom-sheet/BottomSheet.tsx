import { useConstructor, useOnFullScreen } from '@/hooks';
import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';

import { Overlay } from '../overlay';
import { Portal } from '../portal';
import styles from './BottomSheet.module.scss';
import {
  BottomSheetButton,
  BottomSheetButtonActionProps,
} from './BottomSheetButton';

export type BottomSheetActionOrientation = 'horizontal' | 'vertical';

export interface BottomSheetProps extends React.ComponentPropsWithRef<'div'> {
  actionOrientation?: BottomSheetActionOrientation;
  bindClose?: (open: () => void) => void;
  bindOpen?: (open: () => void) => void;
  documentBodyClassName?: string;
  heading?: React.ReactNode;
  onClose?: () => void;
  onESCKeyDown?: () => void;
  onOpen?: () => void;
  onOverlayClick?: () => void;
  openOnLoad?: boolean;
  primaryAction?: BottomSheetButtonActionProps;
  secondaryAction?: BottomSheetButtonActionProps;
  showFooter?: boolean;
  showHeader?: boolean;
  showOverlay?: boolean;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      actionOrientation,
      bindClose,
      bindOpen,
      children,
      documentBodyClassName = 'bottom-sheet-block-overflow',
      heading,
      onClose,
      onESCKeyDown,
      onOpen,
      onOverlayClick,
      openOnLoad = false,
      primaryAction,
      secondaryAction,
      showFooter = true,
      showHeader = true,
      showOverlay = true,
      ...rest
    },
    ref
  ) => {
    const { open, setOpen } = useOnFullScreen({
      documentBodyClassName,
      onClose,
      onESCKeyDown,
      onOpen,
      openOnLoad,
    });

    useConstructor(() => {
      bindOpen?.(() => {
        setOpen(true);
      });
      bindClose?.(() => {
        setOpen(false);
      });
    });

    const handleOverlayClick = useCallback((): void => {
      onOverlayClick?.();
      setOpen(false);
    }, [onOverlayClick, setOpen]);

    if (!open) {
      return null;
    }

    return (
      <Portal rootId='bottom-sheet-root'>
        <div
          aria-labelledby={showHeader ? 'bottom-sheet-title' : undefined}
          aria-modal
          ref={ref}
          role='dialog'
          {...rest}
          className={clsx(
            styles['bottom-sheet'],
            styles[`bottom-sheet--orientation-${actionOrientation}`],
            rest.className
          )}
        >
          {showOverlay && (
            <Overlay
              aria-label='Close bottom sheet'
              onClick={handleOverlayClick}
            />
          )}
          <div className={clsx(styles['bottom-sheet__body'])}>
            <div className={styles['bottom-sheet__drag']}>
              <div className={styles['bottom-sheet__drag--content']} />
            </div>

            {showHeader && (
              <header className={styles['bottom-sheet__header']}>
                <h2
                  className={styles['bottom-sheet__title']}
                  id='bottom-sheet-title'
                >
                  {heading}
                </h2>
              </header>
            )}
            <main className={clsx(styles['bottom-sheet__content'])}>
              {children}
            </main>
            {showFooter && (
              <footer className={styles['bottom-sheet__footer']}>
                {secondaryAction && (
                  <BottomSheetButton
                    action={secondaryAction}
                    actionOrientation={actionOrientation}
                    theme='link'
                  />
                )}
                {primaryAction && (
                  <div className={styles['bottom-sheet__actions-container']}>
                    {primaryAction && (
                      <BottomSheetButton
                        action={primaryAction}
                        actionOrientation={actionOrientation}
                        theme='primary'
                      />
                    )}
                  </div>
                )}
              </footer>
            )}
          </div>
        </div>
      </Portal>
    );
  }
);
