import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren } from 'react';

import styles from './Checkbox.module.scss';
import { CheckboxIcon } from './IconCheckmarkThick';

interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  containerClassName?: string;
  error?: boolean;
}

export const Checkbox = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CheckboxProps>
>(({ children, containerClassName, error = false, id, name, ...rest }, ref) => (
  <div className={containerClassName}>
    <input
      aria-invalid={!!error}
      aria-labelledby={name}
      id={id}
      name={name}
      ref={ref}
      type='checkbox'
      {...rest}
      className={clsx(styles['checkbox'], rest.className, {
        [styles['checkbox--error']]: error,
      })}
    />
    <label className={styles['checkbox__label']} htmlFor={id}>
      <CheckboxIcon className={styles['checkbox__icon']} />
      <span className={styles['checkbox__text']}>{children}</span>
    </label>
  </div>
));
