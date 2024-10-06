import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { IconTimes } from '../icons';
import styles from './TextField.module.scss';

interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  containerClassName?: string;
  contentLeft?: JSX.Element;
  contentRight?: JSX.Element;
  dir?: 'ltr' | 'rtl';
  errorText?: string;
  helperText?: JSX.Element | string;
  label: string;
  labelPosition?: 'inside' | 'outside';
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      containerClassName,
      contentLeft,
      contentRight,
      dir,
      disabled,
      errorText,
      helperText,
      id,
      label,
      labelPosition = 'inside',
      placeholder,
      type = 'text',
      value,
      ...rest
    },
    ref
  ) => {
    const renderLabel = (): JSX.Element => (
      <label
        className={clsx(styles['text-field__label'], {
          [styles['text-field__label--active']]: !!value || !!placeholder,
        })}
        htmlFor={id}
      >
        {label}
      </label>
    );

    const renderInput = (): JSX.Element => (
      <input
        id={id}
        ref={ref}
        type={type}
        {...rest}
        className={styles['text-field__input']}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        {...(errorText ? { 'aria-invalid': true } : {})}
        aria-errormessage={errorText}
      />
    );

    const renderContent = (): JSX.Element => {
      const suffix = value
        ? (contentRight ?? (
            <button>
              <IconTimes />
            </button>
          ))
        : null;

      return labelPosition === 'inside' ? (
        <>
          {contentLeft}
          <div className={styles['text-field__input-wrapper']} dir={dir}>
            {renderLabel()}
            {renderInput()}
          </div>
          {suffix}
        </>
      ) : (
        <>
          {renderLabel()}
          <div
            className={clsx(styles['text-field__input-wrapper'], {
              [styles['text-field__input-wrapper--disabled']]: disabled,
              [styles['text-field__input-wrapper--error']]: !!errorText,
            })}
            dir={dir}
          >
            {contentLeft}
            {renderInput()}
            {suffix}
          </div>
        </>
      );
    };

    return (
      <div
        className={clsx(
          styles['text-field__container'],
          styles[`text-field__container--label-${labelPosition}`],
          containerClassName
        )}
      >
        <div
          className={clsx(styles['text-field'], {
            [styles['text-field--disabled']]: disabled,
            [styles['text-field--error']]: !!errorText,
          })}
        >
          {renderContent()}
        </div>
        {errorText || helperText ? (
          <p
            className={clsx(styles['text-field__text'], {
              [styles['text-field__text--error']]: !!errorText,
            })}
          >
            {errorText || helperText}
          </p>
        ) : null}
      </div>
    );
  }
);
