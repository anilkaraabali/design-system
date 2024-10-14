import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Switch.module.scss';

interface SwitchPropsInterface extends React.ComponentProps<'button'> {
  checked?: boolean;
  required?: boolean;
  size?: 'large' | 'regular';
}

export const Switch = forwardRef<HTMLButtonElement, SwitchPropsInterface>(
  (
    {
      checked = false,
      children,
      id = 'switch',
      required,
      size = 'regular',
      ...rest
    },
    ref
  ) => (
    <div className={styles['switch__container']}>
      <button
        aria-checked={checked}
        aria-required={required}
        id={id}
        {...rest}
        className={clsx(
          styles['switch'],
          styles[`switch--${size}`],
          {
            [styles['switch--checked']]: checked,
          },
          rest.className
        )}
        ref={ref}
        role='switch'
        type='button'
      />
      {children && (
        <label className={styles['switch__label']} htmlFor={id}>
          {children}
        </label>
      )}
    </div>
  )
);
