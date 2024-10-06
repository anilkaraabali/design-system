import { useCallback, useState } from 'react';
import {
  SwipeableHandlers,
  SwipeEventData,
  useSwipeable,
} from 'react-swipeable';

function findParentWithAttribute(
  element: HTMLElement,
  attributeName: string
): HTMLElement | null {
  let currentElement: HTMLElement | null = element;

  while (currentElement) {
    if (currentElement.hasAttribute(attributeName)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
}

export const useCarouselSwipe = ({
  numberOfCards,
}: {
  numberOfCards: number;
}): {
  swipeableProps: Omit<SwipeableHandlers, 'ref'>;
  swipeNext: () => void;
  swipePrevious: () => void;
  swipeRef: (element: HTMLElement | null) => void;
  targetIndex: number;
} => {
  const [targetIndex, setTargetIndex] = useState(0);

  const onSwipe = useCallback((eventData: SwipeEventData) => {
    const newTargetIndex = Number(
      findParentWithAttribute(
        eventData.event.target as HTMLElement,
        'data-carousel-item'
      )?.getAttribute('data-carousel-item')
    );

    setTargetIndex((current) => {
      if (eventData.velocity > 1.5 || newTargetIndex === current) {
        const multiplier = (eventData.dir === 'Left' ? 1 : -1) * 1;

        const newTarget = Math.floor(
          newTargetIndex +
            (newTargetIndex === current
              ? multiplier
              : eventData.velocity * multiplier)
        );

        if (newTarget >= numberOfCards) {
          return numberOfCards - 1;
        } else if (newTarget <= 0) {
          return 0;
        }
        return newTarget;
      }
      return newTargetIndex;
    });
  }, []);

  const { ref, ...rest } = useSwipeable({
    onSwiped: onSwipe,
    preventScrollOnSwipe: true,
    swipeDuration: 750,
  });

  return {
    swipeableProps: rest,
    swipeNext: (): void => {
      if (targetIndex !== numberOfCards - 1) {
        setTargetIndex((current) => current + 1);
      }
    },
    swipePrevious: (): void => {
      if (targetIndex !== 0) {
        setTargetIndex((current) => current - 1);
      }
    },
    swipeRef: ref,
    targetIndex,
  };
};
