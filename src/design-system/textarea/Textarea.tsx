import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Textarea.module.scss';

type TextareaVariantsType =
  | {
      label: string;
      labelPosition?: 'outside';
    }
  | {
      label?: never;
      labelPosition?: 'inside';
    };

export type TextareaProps = {
  errorText?: string;
  helperText?: string;
} & React.ComponentPropsWithRef<'textarea'> &
  TextareaVariantsType;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      disabled = false,
      errorText,
      helperText,
      id,
      label,
      labelPosition = 'inside',
      ...rest
    },
    ref
  ) => (
    <div
      className={clsx(styles['textarea'], {
        [styles['textarea--disabled']]: disabled,
        [styles['textarea--error']]: !!errorText,
        [styles[`textarea--${labelPosition}`]]: !!labelPosition,
      })}
    >
      {labelPosition === 'outside' && !!label && (
        <label className={styles['textarea__label']} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        {...rest}
        className={clsx(styles['textarea__input'], rest.className)}
        disabled={disabled}
        {...(errorText ? { 'aria-invalid': true } : {})}
        aria-errormessage={errorText}
      />
      {helperText && (
        <label className={styles['textarea__info']}>{helperText}</label>
      )}
      {!!errorText && (
        <label className={styles['textarea__error']}>{errorText}</label>
      )}
    </div>
  )
);
