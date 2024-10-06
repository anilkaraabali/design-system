import clsx from 'clsx';
import React from 'react';

import { Button, ButtonProps } from '../button';
import { Link, LinkProps } from '../link';
import styles from './Snackbar.module.scss';
import { useSnackbarStore } from './SnackbarStore';

export type SnackbarActionType = ButtonProps | LinkProps;

interface SnackbarActionProps {
  action: SnackbarActionType;
}

export const SnackbarAction: React.FC<SnackbarActionProps> = ({ action }) => {
  const { hide } = useSnackbarStore();

  return 'href' in action ? (
    <Link
      theme='ghost'
      {...action}
      className={clsx(
        styles['snackbar__action'],
        styles['snackbar__action--link'],
        action.className
      )}
      href={action.href}
      onClick={(e): void => {
        action.onClick?.(e);
        hide();
      }}
    >
      {action.children}
    </Link>
  ) : (
    <Button
      theme='ghost'
      {...action}
      className={clsx(
        styles['snackbar__action'],
        styles['snackbar__action--button'],
        action.className
      )}
      onClick={(e): void => {
        action.onClick?.(e);
        hide();
      }}
    >
      {action.children}
    </Button>
  );
};
