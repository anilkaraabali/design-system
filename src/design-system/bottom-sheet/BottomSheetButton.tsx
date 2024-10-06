import clsx from 'clsx';
import React from 'react';

import { Button, ButtonProps, ButtonTheme } from '../button';
import { BottomSheetActionOrientation } from './BottomSheet';
import styles from './BottomSheet.module.scss';

export interface BottomSheetButtonActionProps {
  content?: React.ReactNode;
  props: ButtonProps;
}

interface BottomSheetButtonProps {
  action: BottomSheetButtonActionProps;
  actionOrientation?: BottomSheetActionOrientation;
  theme: ButtonTheme;
}

export const BottomSheetButton: React.FC<BottomSheetButtonProps> = ({
  action,
  actionOrientation,
  theme,
}) => (
  <Button
    theme={theme}
    {...action.props}
    className={clsx(styles['bottom-sheet__action'], action.props?.className, {
      [styles['bottom-sheet__action--extra-padding']]:
        actionOrientation === 'vertical' && theme === 'link',
    })}
  >
    {action.content}
  </Button>
);
