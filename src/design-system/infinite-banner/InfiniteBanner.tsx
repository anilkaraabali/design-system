import clsx from 'clsx';
import { list } from 'radash';
import { forwardRef } from 'react';

import styles from './InfiniteBanner.module.scss';

interface InfiniteBannerProps extends React.ComponentPropsWithRef<'div'> {
  carouselClassName?: string;
  children: React.ReactElement;
  count?: number;
}

export const InfiniteBanner = forwardRef<HTMLDivElement, InfiniteBannerProps>(
  ({ carouselClassName, children, count = 1, ...rest }, ref) => (
    <div ref={ref} {...rest} className={clsx(styles['banner'], rest.className)}>
      <div className={clsx(styles['banner__carousel'], carouselClassName)}>
        {list(count).map(() => children)}
      </div>
    </div>
  )
);
