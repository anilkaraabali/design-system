import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Container.module.scss';

interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  as?: React.ElementType;
  fluid?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', children, fluid = false, ...rest }, ref) => (
    <Component
      ref={ref}
      {...rest}
      className={clsx(
        styles['container'],
        {
          [styles['container--fluid']]: fluid,
        },
        rest.className
      )}
    >
      {children}
    </Component>
  )
);
