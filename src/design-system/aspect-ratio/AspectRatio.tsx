import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './AspectRatio.module.scss';

interface AspectRatioProps extends React.ComponentPropsWithRef<'div'> {
  ratio?: number;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1 / 1, ...rest }, ref) => (
    <div
      className={styles['aspect-ratio']}
      style={{ '--ratio': ratio } as React.CSSProperties}
    >
      <div
        {...rest}
        className={clsx(styles['aspect-ratio__inner'], rest.className)}
        ref={ref}
      />
    </div>
  )
);
