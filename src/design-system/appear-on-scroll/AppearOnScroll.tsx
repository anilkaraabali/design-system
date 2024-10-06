import { useHideOnScrollingDown } from '@/hooks';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './AppearOnScroll.module.scss';

interface AppearOnScrollProps extends React.ComponentPropsWithRef<'div'> {}

export const AppearOnScroll = forwardRef<HTMLDivElement, AppearOnScrollProps>(
  ({ children, ...rest }, ref) => {
    const hideBottomNavigation = useHideOnScrollingDown();

    const { inView, ref: stickyRef } = useInView();

    return (
      <>
        <div id='sticky-ref' ref={stickyRef} />
        <div
          {...rest}
          className={clsx(
            styles['appear-on-scroll'],
            {
              [styles['appear-on-scroll--hidden']]:
                !inView && hideBottomNavigation,
              [styles['appear-on-scroll--not-in-view']]: !inView,
            },
            rest.className
          )}
          ref={ref}
        >
          {children}
        </div>
      </>
    );
  }
);
