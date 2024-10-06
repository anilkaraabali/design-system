import clsx from 'clsx';
import React from 'react';

import { ModalProps } from './Modal';
import styles from './Modal.module.scss';
import { ModalButton } from './ModalButton';

interface ModalContentProps
  extends Pick<
    ModalProps,
    | 'actionOrientation'
    | 'contentClassName'
    | 'primaryAction'
    | 'secondaryAction'
    | 'showFooter'
    | 'tertiaryAction'
  > {}

export const ModalContent: React.FC<
  React.PropsWithChildren<ModalContentProps>
> = ({
  actionOrientation = 'horizontal',
  children,
  contentClassName,
  primaryAction,
  secondaryAction,
  showFooter = true,
  tertiaryAction,
}) => (
  <>
    <div className={clsx(styles['modal__content'], contentClassName)}>
      {children}
    </div>
    {showFooter && (
      <footer className={styles['modal__footer']}>
        {tertiaryAction && (
          <ModalButton
            action={tertiaryAction}
            actionOrientation={actionOrientation}
            theme='link'
          />
        )}
        {(primaryAction || secondaryAction) && (
          <div className={styles['modal__actions-container']}>
            {secondaryAction && (
              <ModalButton
                action={secondaryAction}
                actionOrientation={actionOrientation}
                theme='secondary'
              />
            )}
            {primaryAction && (
              <ModalButton
                action={primaryAction}
                actionOrientation={actionOrientation}
                theme='primary'
              />
            )}
          </div>
        )}
      </footer>
    )}
  </>
);
