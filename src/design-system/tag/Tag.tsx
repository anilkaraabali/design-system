import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';

import { IconProps } from '../icons/Icon.interface';
import styles from './Tag.module.scss';

interface TagProps extends React.ComponentPropsWithoutRef<'div'> {
  icon?: {
    component: React.FC<IconProps>;
    position: 'prefix' | 'suffix';
    props?: IconProps;
  };
  shape?: 'default' | 'rounded';
  size?: 'large' | 'medium' | 'small';
  type?: 'sale';
}

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    { children, icon, shape = 'default', size = 'medium', type, ...rest },
    ref
  ) => {
    let Icon: null | React.FC<IconProps> = null;
    const iconPosition: Required<TagProps>['icon']['position'] =
      icon?.position ?? 'prefix';

    if (icon) {
      Icon = icon.component;
    } else {
      switch (type) {
        default:
          Icon = null;
          break;
      }
    }

    const Content = useCallback(
      () => (
        <>
          {Icon && iconPosition === 'prefix' && (
            <Icon
              {...icon?.props}
              className={clsx(
                styles['tag__icon'],
                styles['tag__icon--prefix'],
                icon?.props?.className
              )}
            />
          )}
          {children}
          {Icon && iconPosition === 'suffix' && (
            <Icon
              {...icon?.props}
              className={clsx(
                styles['tag__icon'],
                styles['tag__icon--suffix'],
                icon?.props?.className
              )}
            />
          )}
        </>
      ),
      []
    );

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['tag'],
          styles[`tag--${shape}`],
          {
            [styles['tag--reduce-padding-prefix']]:
              Icon && iconPosition === 'prefix',
            [styles['tag--reduce-padding-suffix']]:
              Icon && iconPosition === 'suffix',
            [styles[`tag--${type}`]]: !!type,
            [styles[`tag-size--${size}`]]: !!size,
          },
          rest.className
        )}
      >
        <Content />
      </div>
    );
  }
);
