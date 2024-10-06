import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Indicator.module.scss';
import { getTransform } from './utils/get-transform';
import { makeItems } from './utils/make-items';

interface IndicatorProps extends React.ComponentPropsWithRef<'div'> {
  activeIndex: number;
  dotClassName?: string;
  itemsCount: number;
  itemWidth: number;
  numberOfIndicators?: number;
}

export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(
  (
    {
      activeIndex,
      dotClassName,
      itemsCount,
      itemWidth,
      numberOfIndicators = 7,
      ...rest
    },
    ref
  ) => {
    if (itemsCount <= 1) {
      return null;
    }

    const items = makeItems(itemsCount, activeIndex, numberOfIndicators);
    const transformXPx = getTransform(items, itemWidth);

    const widthMultiplier =
      itemsCount < numberOfIndicators ? ++itemsCount : numberOfIndicators;

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(styles['indicator'], rest.className)}
        style={{
          width: itemWidth * widthMultiplier,
        }}
      >
        <div
          className={styles['indicator__list']}
          style={{
            transform: `translateX(${transformXPx}px)`,
          }}
        >
          {items.map((item, itemIndex) => (
            <div
              className={clsx(
                styles['indicator__dot'],
                {
                  [styles['indicator__dot--active']]: item.isActive,
                  [styles['indicator__dot--hidden']]: item.isHidden,
                  [styles['indicator__dot--small']]: item.isSmall,
                },
                dotClassName
              )}
              key={itemIndex}
            />
          ))}
        </div>
      </div>
    );
  }
);
