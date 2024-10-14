import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { ButtonProps } from '../button';
import styles from './Link.module.scss';

export interface LinkProps
  extends Omit<React.ComponentPropsWithRef<'a'>, 'href'>,
    Pick<ButtonProps, 'icon' | 'size' | 'theme'> {
  href: string;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className,
      href,
      icon,
      size = 'default',
      theme = 'none',
      ...rest
    },
    ref
  ) => {
    const Icon = icon?.component;
    const hasChildren = !!children;
    const isLinkTheme = theme === 'link';

    return (
      <a
        className={clsx(styles['link'], className, {
          [styles['link--reduce-padding-prefix']]:
            hasChildren && icon?.position === 'prefix',
          [styles['link--reduce-padding-suffix']]:
            hasChildren && icon?.position === 'suffix',
          [styles['link-theme']]: theme,
          [styles[`link-size--${size}`]]: theme,
          [styles[`link-theme--${theme}--with-padding`]]:
            !!theme && !isLinkTheme && hasChildren,
          [styles[`link-theme--${theme}`]]: theme,
        })}
        href={href}
        ref={ref}
        {...rest}
      >
        {Icon && icon?.position === 'prefix' && (
          <Icon
            {...icon.props}
            className={clsx(
              { [styles['link__icon--prefix']]: hasChildren },
              icon.props?.className
            )}
          />
        )}
        {children}
        {Icon && icon?.position === 'suffix' && (
          <Icon
            {...icon.props}
            className={clsx(
              { [styles['link__icon--suffix']]: hasChildren },
              icon.props?.className
            )}
          />
        )}
      </a>
    );
  }
);
