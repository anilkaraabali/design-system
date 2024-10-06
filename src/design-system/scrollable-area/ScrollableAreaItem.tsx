import clsx from 'clsx';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './ScrollableArea.module.scss';

export interface ScrollableAreaItemProps {
  index: number;
  itemClassName?: string;
  itemPosition: (index: number, entry: IntersectionObserverEntry) => void;
}

export const ScrollableAreaItem: React.FC<
  React.PropsWithChildren<ScrollableAreaItemProps>
> = ({ children, index, itemClassName, itemPosition }) => {
  const { entry, ref } = useInView({
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
  });

  if (entry) {
    itemPosition(index, entry);
  }

  return (
    <li
      className={clsx(styles['scrollable-area__item'], itemClassName)}
      ref={ref}
    >
      {children}
    </li>
  );
};
