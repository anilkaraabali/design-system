import clsx from 'clsx';
import React from 'react';

import { Button, ButtonProps, ButtonTheme } from '../button';
import { ModalActionOrientation } from './Modal';
import styles from './Modal.module.scss';

export interface ModalButtonActionProps {
  content?: React.ReactNode;
  props: ButtonProps;
}

interface ModalButtonProps {
  action: ModalButtonActionProps;
  actionOrientation: ModalActionOrientation;
  theme: ButtonTheme;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  action,
  actionOrientation,
  theme,
}) => (
  <Button
    theme={theme}
    {...action.props}
    className={clsx(styles['modal__action'], action.props?.className, {
      [styles['modal__action--extra-padding']]:
        actionOrientation === 'vertical' && theme === 'link',
    })}
  >
    {action.content}
  </Button>
);
