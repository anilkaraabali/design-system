import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { IconProps } from '../icons/Icon.interface';
import styles from './Button.module.scss';
import { ButtonLoader } from './ButtonLoader';

export type ButtonTheme =
  | 'ghost'
  | 'link'
  | 'primary'
  | 'secondary'
  | 'tertiary';

export type ButtonSize = 'default' | 'small' | 'xsmall';

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon?: {
    component: React.FC<IconProps>;
    position: 'prefix' | 'suffix';
    props?: IconProps;
  };
  loading?: boolean;
  shape?: 'default' | 'rounded';
  size?: ButtonSize;
  theme?: ButtonTheme;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      loading = false,
      shape = 'default',
      size = 'default',
      theme,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const Icon = icon?.component;
    const hasChildren = !!children;
    const isLinkTheme = theme === 'link';

    return (
      <button
        ref={ref}
        type={type}
        {...rest}
        className={clsx(
          styles['button'],

          {
            [styles['button--loading']]: loading,
            [styles['button--reduce-padding-prefix']]:
              hasChildren && icon?.position === 'prefix',
            [styles['button--reduce-padding-suffix']]:
              hasChildren && icon?.position === 'suffix',
            [styles['button-theme']]: theme,
            [styles[`button-size--${size}`]]: theme,
            [styles[`button-theme--${theme}--rounded`]]:
              shape === 'rounded' && theme && !hasChildren,
            [styles[`button-theme--${theme}--with-padding`]]:
              theme && !isLinkTheme && hasChildren,
            [styles[`button-theme--${theme}`]]: theme,
          },
          rest.className
        )}
      >
        {loading ? (
          <ButtonLoader />
        ) : (
          <>
            {Icon && icon?.position === 'prefix' && (
              <Icon
                {...icon.props}
                className={clsx(
                  { [styles['button__icon--prefix']]: hasChildren },
                  icon.props?.className
                )}
              />
            )}
            {children}
            {Icon && icon?.position === 'suffix' && (
              <Icon
                {...icon.props}
                className={clsx(
                  { [styles['button__icon--suffix']]: hasChildren },
                  icon.props?.className
                )}
              />
            )}
          </>
        )}
      </button>
    );
  }
);
