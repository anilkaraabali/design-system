import { useConstructor } from '@/hooks';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getNextScrollItem } from './get-next-item';
import { getPrevScrollItem } from './get-prev-item';
import styles from './ScrollableArea.module.scss';
import { ScrollableAreaItem } from './ScrollableAreaItem';

type SwipeDirection = 'next' | 'prev';

export interface ScrollableAreaItemsInterface {
  [key: number]: {
    entry: IntersectionObserverEntry;
  };
}

export interface ScrollableAreaProps {
  bindNextItem?: (nextItem: () => void) => void;
  bindPrevItem?: (prevItem: () => void) => void;
  containerClassName?: string;
  initialJumpToItemIndex?: number;
  itemClassName?: string;
  onChange?: (scrollPosition: number) => void;
  setScrollDisabled?: (scrollDisabled: boolean) => void;
  wrapperClassName?: string;
}

export const ScrollableArea: React.FC<
  React.PropsWithChildren<ScrollableAreaProps>
> = ({
  bindNextItem,
  bindPrevItem,
  children,
  containerClassName,
  initialJumpToItemIndex = 0,
  itemClassName,
  onChange,
  setScrollDisabled,
  wrapperClassName,
}) => {
  const galleryRef = useRef<HTMLUListElement | null>(null);
  const items = useRef<ScrollableAreaItemsInterface>({});

  const [move, setMove] = useState<null | SwipeDirection>(null);
  const [visibleInitialItem, setVisibleInitialItem] = useState<number>(-1);
  const [nextItemIndex, setNextItemIndex] = useState(initialJumpToItemIndex);

  useConstructor(() => {
    bindNextItem?.(() => {
      const nextItemIndex = getNextScrollItem(items.current);
      setNextItemIndex(nextItemIndex);
      setMove('next');
    });

    bindPrevItem?.(() => {
      const nextItemIndex = getPrevScrollItem(items.current);
      setNextItemIndex(nextItemIndex);
      setMove('prev');
    });
  });

  const onItemPosition = (index: number, entry: IntersectionObserverEntry) => {
    items.current[index] = {
      entry,
    };

    if (initialJumpToItemIndex > 0 && index === initialJumpToItemIndex) {
      setVisibleInitialItem(index);
    }
  };

  const onScroll: React.UIEventHandler<HTMLUListElement> = useCallback(
    (e): void => {
      const { clientWidth, scrollLeft, scrollWidth } = e.currentTarget;
      let scrollPercentage = Math.abs(scrollLeft / (scrollWidth - clientWidth));

      if (isNaN(scrollPercentage)) {
        scrollPercentage = 0;
      }
      onChange?.(scrollPercentage);
    },
    [onChange]
  );

  useEffect(() => {
    setScrollDisabled?.(
      galleryRef.current?.scrollWidth === galleryRef.current?.clientWidth
    );

    if (move) {
      if (nextItemIndex !== null) {
        const nextItemWidth =
          items.current[nextItemIndex].entry.target.clientWidth || 0;
        const visibleWidth =
          nextItemWidth * items.current[nextItemIndex].entry.intersectionRatio;
        const offset = nextItemWidth - visibleWidth;

        if (offset !== undefined) {
          galleryRef.current?.scrollBy({
            behavior: 'smooth',
            left: move === 'next' ? offset : -offset,
            top: 0,
          });
        }
      }
    }

    setMove(null);
  }, [move, items, nextItemIndex]);

  useEffect(() => {
    if (visibleInitialItem > -1) {
      const offset =
        items.current[visibleInitialItem].entry.boundingClientRect.left;

      if (offset > 0) {
        galleryRef.current?.scrollBy({
          behavior: 'smooth',
          left: offset,
          top: 0,
        });
      }
    }
  }, [visibleInitialItem]);

  return (
    <div className={clsx(styles['scrollable-area'], containerClassName)}>
      <ul
        className={clsx(styles['scrollable-area__wrapper'], wrapperClassName)}
        onScroll={onScroll}
        ref={galleryRef}
      >
        {React.Children.map(children, (child, index) => (
          <ScrollableAreaItem
            index={index}
            itemClassName={itemClassName}
            itemPosition={onItemPosition}
            key={index}
          >
            {child}
          </ScrollableAreaItem>
        ))}
      </ul>
    </div>
  );
};
