import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { Button } from '../button';
import { Overlay } from '../overlay';
import { Portal } from '../portal';
import styles from './Dialog.module.scss';
import { IDialogStore } from './hook';

export interface DialogProps extends Omit<IDialogStore, 'openDialog'> {}

export const Dialog: React.FC<DialogProps> = ({
  closeDialog,
  content,
  disableEscapeKeyDown = false,
  isOpen,
  onOverlayClick,
  primaryAction,
  secondaryAction,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleOverlayClick = (): void => {
    onOverlayClick?.();
    closeDialog();
  };

  useEffect(() => {
    btnRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent): void => {
      if (!disableEscapeKeyDown && e.key === 'Escape') {
        closeDialog();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return (): void => window.removeEventListener('keydown', handleKeydown);
  }, [closeDialog]);

  if (!isOpen) return null;

  return (
    <Portal rootId='dialog-root'>
      <div
        aria-describedby='dialog-description'
        className={styles['dialog']}
        role='dialog'
      >
        <Overlay aria-label='Close dialog' onClick={handleOverlayClick} />
        <div className={styles['dialog__content']}>
          <p className={styles['dialog__text']} id='dialog-description'>
            {content}
          </p>
          <div className={styles['dialog__actions']}>
            {secondaryAction?.label ? (
              <Button
                theme='link'
                {...secondaryAction.props}
                className={clsx(
                  styles['dialog__action'],
                  styles['dialog__action--secondary'],
                  secondaryAction.props?.className
                )}
                onClick={(e): void => {
                  secondaryAction.props?.onClick?.(e);
                  closeDialog();
                }}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
            <Button
              theme='primary'
              {...primaryAction.props}
              className={clsx(
                styles['dialog__action'],
                styles['dialog__action--primary'],
                primaryAction.props?.className
              )}
              onClick={(e): void => {
                primaryAction.props?.onClick?.(e);
                closeDialog();
              }}
              ref={btnRef}
            >
              {primaryAction.label}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
