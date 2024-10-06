import clsx from 'clsx';
import React from 'react';

import { IconProps } from '../icons/Icon.interface';
import styles from './Chip.module.scss';

type CommonType = {
  checked?: boolean;
  disabled?: boolean;
  icon?: {
    component: React.FC<IconProps>;
    position: 'prefix' | 'suffix';
    props?: IconProps;
  };
};

type ButtonType = Omit<React.ComponentPropsWithoutRef<'button'>, 'type'>;
type AnchorType = React.ComponentPropsWithoutRef<'a'>;
type StaticType = React.ComponentPropsWithoutRef<'div'>;

type ChipPropsType = (AnchorType | ButtonType | StaticType) & CommonType;

export const Chip: React.FC<React.PropsWithChildren<ChipPropsType>> = ({
  checked = false,
  children,
  className,
  disabled = false,
  icon,
  ...props
}) => {
  const Icon = icon?.component;
  const Component: React.ElementType =
    'href' in props ? 'a' : 'on' in props ? 'button' : 'div';

  return (
    <Component
      className={clsx(styles['chip'], className, {
        [styles['chip--checked']]: checked,
        [styles['chip--disabled']]: disabled,
        [styles['chip--reduce-padding-prefix']]: icon?.position === 'prefix',
        [styles['chip--reduce-padding-suffix']]: icon?.position === 'suffix',
      })}
      {...(props as React.ElementType<typeof Component>)}
      {...(Component === 'button' && { type: 'button' })}
    >
      {Icon && icon?.position === 'prefix' && (
        <Icon
          {...icon.props}
          className={clsx(
            styles['chip__icon'],
            styles['chip__icon--prefix'],
            icon.props?.className
          )}
        />
      )}
      {children}
      {Icon && icon?.position === 'suffix' && (
        <Icon
          {...icon.props}
          className={clsx(
            styles['chip__icon'],
            styles['chip__icon--suffix'],
            icon.props?.className
          )}
        />
      )}
    </Component>
  );
};
