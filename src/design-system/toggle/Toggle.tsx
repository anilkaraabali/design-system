import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Toggle.module.scss';

interface TogglePropsInterface extends React.ComponentProps<'button'> {
  checked?: boolean;
  size?: 'big' | 'default';
}

export const Toggle = forwardRef<HTMLButtonElement, TogglePropsInterface>(
  ({ checked = false, size = 'default', ...rest }, ref) => (
    <button
      className={clsx(
        styles['toggle'],
        styles[`toggle--${size}`],
        {
          [styles['toggle--checked']]: checked,
        },
        rest.className
      )}
      ref={ref}
      {...rest}
    />
  )
);
