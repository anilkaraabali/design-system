import React, { useCallback, useRef, useState } from 'react';

import { NavigationArrows, NavigationArrowsProps } from '../navigation-arrows';
import { ScrollableArea, ScrollableAreaProps } from './ScrollableArea';

interface ScrollableAreaHookResultInterface {
  ScrollableArea: React.FC<React.PropsWithChildren<ScrollableAreaProps>>;
  ScrollableAreaArrows: React.FC<NavigationArrowsProps>;
}

export const useScrollableArea = (): ScrollableAreaHookResultInterface => {
  const nextItemRef = useRef<Function | null>(null);
  const prevItemRef = useRef<Function | null>(null);

  const [currentScrollPercentage, setCurrentScrollPercentage] = useState(0);
  const [scrollIsDisabled, setScrollDisabled] = useState(false);

  const MainComponent = useCallback<
    ScrollableAreaHookResultInterface['ScrollableArea']
  >(
    (props) => (
      <ScrollableArea
        {...props}
        bindNextItem={(nextItem): void => {
          nextItemRef.current = nextItem;
        }}
        bindPrevItem={(prevItem): void => {
          prevItemRef.current = prevItem;
        }}
        onChange={setCurrentScrollPercentage}
        setScrollDisabled={setScrollDisabled}
      />
    ),
    []
  );

  const NavigationComponent = useCallback<
    ScrollableAreaHookResultInterface['ScrollableAreaArrows']
  >(
    (props) => (
      <NavigationArrows
        nextProps={{
          disabled: scrollIsDisabled || currentScrollPercentage >= 0.99,

          shape: 'rounded',
          theme: 'secondary',
        }}
        nextRef={nextItemRef}
        prevProps={{
          disabled: currentScrollPercentage === 0,
          shape: 'rounded',
          theme: 'secondary',
        }}
        prevRef={prevItemRef}
        {...props}
      />
    ),
    [currentScrollPercentage, scrollIsDisabled]
  );

  return {
    ScrollableArea: MainComponent,
    ScrollableAreaArrows: NavigationComponent,
  };
};
