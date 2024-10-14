import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Avatar.module.scss';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export interface AvatarProps extends React.ComponentPropsWithRef<'div'> {
  halo?: boolean;
  image?: JSX.Element;
  initials?: {
    firstName: string;
    lastName: string;
  };
  size: 'lg' | 'md' | 'sm';
}

const getInitials = (initials: AvatarProps['initials']): string => {
  if (!initials) {
    return '';
  }

  const { firstName = '', lastName = '' } = initials;
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ halo = false, image, initials, size, ...rest }, ref) => {
    const initialsString = getInitials(initials);
    const avatarContent = image || initialsString || (
      <AvatarPlaceholder
        className={clsx(
          styles['avatar__placeholder'],
          styles[`avatar__placeholder--${size}`]
        )}
      />
    );

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['avatar'],
          styles[`avatar-size--${size}`],
          {
            [styles['avatar--halo']]: halo,
            [styles['avatar--initials']]: !!initialsString,
          },
          rest.className
        )}
      >
        {avatarContent}
      </div>
    );
  }
);
