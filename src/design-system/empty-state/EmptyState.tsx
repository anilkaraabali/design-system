import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { Button, ButtonProps } from '../button';
import { Link, LinkProps } from '../link';
import styles from './EmptyState.module.scss';

export interface EmptyStateProps extends React.ComponentPropsWithRef<'div'> {
  action?: ButtonProps | LinkProps;
  description?: string;
  heading: string;
  imageUrl?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      action,
      description,
      heading,
      imageUrl = '/images/illustrations/empty.svg',
      ...rest
    },
    ref
  ) => (
    <div
      ref={ref}
      {...rest}
      className={clsx(styles['empty-state'], rest.className)}
    >
      <picture>
        <img alt='Empty State Placeholder' src={imageUrl} />
      </picture>
      <div className={styles['empty-state__content']}>
        <p className={styles['empty-state__title']}>{heading}</p>
        {description && (
          <p className={styles['empty-state__description']}>{description}</p>
        )}
      </div>
      {typeof action !== 'undefined' ? (
        'href' in action ? (
          <Link
            theme='primary'
            {...action}
            className={clsx(styles['empty-state__action'], action?.className)}
          />
        ) : (
          <Button
            theme='primary'
            {...action}
            className={clsx(styles['empty-state__action'], action?.className)}
          />
        )
      ) : null}
    </div>
  )
);
