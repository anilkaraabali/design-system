import clsx from 'clsx';
import React, { forwardRef, Fragment, RefObject } from 'react';

import { Button, ButtonProps } from '../button';
import { IconArrowLeft, IconArrowRight } from '../icons';
import styles from './NavigationArrows.module.scss';

export interface NavigationArrowsProps
  extends React.ComponentPropsWithRef<'div'> {
  as?: React.ElementType;
  nextProps?: Partial<ButtonProps>;
  nextRef?: RefObject<Function | null>;
  prevProps?: Partial<ButtonProps>;
  prevRef?: RefObject<Function | null>;
}

export const NavigationArrows = forwardRef<
  HTMLDivElement,
  NavigationArrowsProps
>(
  (
    { as: Element = 'div', nextProps, nextRef, prevProps, prevRef, ...rest },
    ref
  ) => (
    <Element
      ref={ref}
      {...rest}
      {...(Element === Fragment
        ? {}
        : { className: clsx(styles['navigation-arrows'], rest.className) })}
    >
      <Button
        aria-label='Previous item'
        icon={{ component: IconArrowLeft, position: 'prefix' }}
        shape='rounded'
        size='small'
        theme='secondary'
        {...prevProps}
        className={clsx(
          styles['navigation-arrows__arrow'],
          prevProps?.className
        )}
        onClick={(e): void => {
          prevRef?.current?.();
          prevProps?.onClick?.(e);
        }}
      />
      <Button
        aria-label='Next item'
        icon={{ component: IconArrowRight, position: 'prefix' }}
        shape='rounded'
        size='small'
        theme='secondary'
        {...nextProps}
        className={clsx(
          styles['navigation-arrows__arrow'],
          nextProps?.className
        )}
        onClick={(e): void => {
          nextRef?.current?.();
          nextProps?.onClick?.(e);
        }}
      />
    </Element>
  )
);
