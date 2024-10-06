import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './CircularProgress.module.scss';

export interface CircularProgressProps
  extends React.ComponentPropsWithRef<'div'> {
  size?: 'default' | 'large' | 'small' | 'xlarge';
  theme?: 'dark' | 'light';
}

export const CircularProgress = forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(({ size = 'medium', theme = 'dark', ...rest }, ref) => (
  <div
    className={clsx(
      styles['circular-progress'],
      styles[`circular-progress--${theme}`],
      styles[`circular-progress--${size}`],
      rest.className
    )}
    ref={ref}
    {...rest}
  />
));
