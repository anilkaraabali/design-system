import clsx from 'clsx';
import React, { forwardRef, PropsWithChildren } from 'react';

import { IconCheckmarkThick } from '../icons';
import styles from './Checkbox.module.scss';

interface CheckboxProps extends React.ComponentPropsWithRef<'input'> {
  errorText?: string;
}

export const Checkbox = forwardRef<
  HTMLInputElement,
  PropsWithChildren<CheckboxProps>
>(({ children, errorText, id, name, ...rest }, ref) => (
  <div className={styles['checkbox__container']}>
    <input
      aria-checked={rest.checked}
      aria-invalid={!!errorText}
      aria-labelledby={name}
      aria-required={rest.required}
      id={id}
      name={name}
      ref={ref}
      type='checkbox'
      {...rest}
      className={clsx(styles['checkbox'], rest.className, {
        [styles['checkbox--error']]: !!errorText,
      })}
    />
    <label className={styles['checkbox__label']} htmlFor={id}>
      <IconCheckmarkThick className={styles['checkbox__icon']} />
      <span className={styles['checkbox__content']}>{children}</span>
    </label>
    {errorText && <p className={styles['checkbox__text']}>{errorText}</p>}
  </div>
));
