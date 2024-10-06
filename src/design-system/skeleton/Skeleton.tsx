import clsx from 'clsx';
import React, { forwardRef, useMemo } from 'react';

import styles from './Skeleton.module.scss';

type ManualInput = number | string;

interface SkeletonProps extends React.ComponentPropsWithRef<'div'> {
  height: ManualInput;
  variant?: 'rectangular';
  width?: ManualInput;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ height, variant = 'rectangular', width, ...rest }, ref) => {
    const getStyles = useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = {
        height: undefined,
        width: undefined,
      };

      styles.width = width
        ? typeof width === 'number'
          ? `${width}px`
          : width
        : '100%';
      styles.height = typeof height === 'number' ? `${height}px` : height;

      return styles;
    }, [width, height]);

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['skeleton'],
          {
            [styles[`skeleton--${variant}`]]: !!variant,
          },
          rest.className
        )}
        style={getStyles}
      />
    );
  }
);
