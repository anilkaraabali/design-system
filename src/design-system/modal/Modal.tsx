import { useConstructor, useOnFullScreen } from '@/hooks';
import clsx from 'clsx';
import React, { forwardRef, useCallback, useMemo } from 'react';

import { IconTimes, IconTimesSmall } from '../icons';
import { Overlay } from '../overlay';
import { Portal } from '../portal';
import styles from './Modal.module.scss';
import { ModalButtonActionProps } from './ModalButton';
import { ModalContent } from './ModalContent';

export type ModalActionOrientation = 'horizontal' | 'vertical';

export interface ModalProps extends React.ComponentPropsWithRef<'div'> {
  actionOrientation?: ModalActionOrientation;
  bindClose?: (open: () => void) => void;
  bindOpen?: (open: () => void) => void;
  bodyClassName?: string;
  contentClassName?: string;
  documentBodyClassName?: string;
  fullScreen?: boolean;
  modalTitle?: React.ReactNode;
  onClose?: () => void;
  onCloseButtonClick?: () => void;
  onESCKeyDown?: () => void;
  onOpen?: () => void;
  onOverlayClick?: () => void;
  openOnLoad?: boolean;
  primaryAction?: ModalButtonActionProps;
  secondaryAction?: ModalButtonActionProps;
  showFooter?: boolean;
  showHeader?: boolean;
  showOverlay?: boolean;
  tertiaryAction?: ModalButtonActionProps;
  withForm?: {
    props: React.ComponentPropsWithRef<'form'>;
  };
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      actionOrientation = 'horizontal',
      bindClose,
      bindOpen,
      bodyClassName,
      children,
      contentClassName,
      documentBodyClassName = 'modal-block-overflow',
      fullScreen = false,
      modalTitle,
      onClose,
      onCloseButtonClick,
      onESCKeyDown,
      onOpen,
      onOverlayClick,
      openOnLoad = false,
      primaryAction,
      secondaryAction,
      showFooter = true,
      showHeader = true,
      showOverlay = true,
      tertiaryAction,
      withForm,
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

    const handleCloseButtonClick = useCallback((): void => {
      onCloseButtonClick?.();
      setOpen(false);
    }, [onCloseButtonClick, setOpen]);

    const activeOrientation = useMemo(
      () =>
        actionOrientation
          ? actionOrientation
          : fullScreen
            ? 'vertical'
            : 'horizontal',
      [actionOrientation, fullScreen]
    );

    if (!open) {
      return null;
    }

    return (
      <Portal rootId='modal-root'>
        <div
          aria-labelledby={showHeader ? 'modal-title' : undefined}
          aria-live='assertive'
          aria-modal
          role='dialog'
          {...rest}
          className={clsx(
            styles['modal'],
            styles[`modal--orientation-${actionOrientation}`],
            {
              [styles['modal--full-screen']]: fullScreen,
            },
            rest.className
          )}
          ref={ref}
        >
          {showOverlay && !fullScreen && (
            <Overlay aria-label='Close modal' onClick={handleOverlayClick} />
          )}
          <div className={clsx(styles['modal__body'], bodyClassName)}>
            {showHeader && (
              <>
                <button
                  aria-label='Close'
                  className={styles['modal__close-btn']}
                  onClick={handleCloseButtonClick}
                  type='button'
                >
                  {fullScreen ? <IconTimes /> : <IconTimesSmall />}
                </button>
                <header className={styles['modal__header']}>
                  <h2 className={styles['modal__title']} id='modal-title'>
                    {modalTitle}
                  </h2>
                </header>
              </>
            )}
            {withForm?.props ? (
              <form {...withForm.props}>
                <ModalContent
                  actionOrientation={activeOrientation}
                  contentClassName={contentClassName}
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                  showFooter={showFooter}
                  tertiaryAction={tertiaryAction}
                >
                  {children}
                </ModalContent>
              </form>
            ) : (
              <ModalContent
                actionOrientation={activeOrientation}
                contentClassName={contentClassName}
                primaryAction={primaryAction}
                secondaryAction={secondaryAction}
                showFooter={showFooter}
                tertiaryAction={tertiaryAction}
              >
                {children}
              </ModalContent>
            )}
          </div>
        </div>
      </Portal>
    );
  }
);
