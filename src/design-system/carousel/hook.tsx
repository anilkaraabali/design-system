import { useCallback, useRef } from 'react';

import { NavigationArrows, NavigationArrowsProps } from '../navigation-arrows';
import { CarouselProps, Carousel as Component } from './Carousel';

export const useCarousel = (): {
  Carousel: React.FC<CarouselProps>;
  CarouselNavigationArrows: React.FC<NavigationArrowsProps>;
} => {
  const nextItemRef = useRef<Function | null>(null);
  const prevItemRef = useRef<Function | null>(null);

  const Carousel = useCallback(
    (props: CarouselProps) => (
      <Component
        {...props}
        bindNext={(next): void => {
          nextItemRef.current = next;
        }}
        bindPrev={(prev): void => {
          prevItemRef.current = prev;
        }}
      />
    ),
    []
  );

  return {
    Carousel,
    CarouselNavigationArrows: (props) => (
      <NavigationArrows
        {...props}
        nextRef={nextItemRef}
        prevRef={prevItemRef}
      />
    ),
  };
};
