import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './Carousel.module.scss';
import { useCarouselSwipe } from './swipe.hook';
import { CarouselItemSizeObjectType } from './types';
import { getInfo } from './utils/get-info';
import { getPositionsToShift } from './utils/get-positions-to-shift';

export interface CarouselProps {
  bindNext?: (next: () => void) => void;
  bindPrev?: (prev: () => void) => void;
  children: React.ReactElement[];
  gap?: number;
  onCardChangeEnd?: (index: number) => void;
  onCardChangeStart?: () => void;
  portionsBySize: CarouselItemSizeObjectType;
  resizeOnHover?: boolean;
  revertOnBlur?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  bindNext,
  bindPrev,
  children,
  gap = 8,
  onCardChangeEnd,
  onCardChangeStart,
  portionsBySize,
  resizeOnHover = true,
  revertOnBlur,
}) => {
  const numberOfVisibleCards = useMemo(
    () => Object.keys(portionsBySize).length,
    [portionsBySize]
  );

  const timeoutRef = useRef<NodeJS.Timeout>();
  const [containerWidth, setContainerWidth] = useState(0);
  const [{ currentIndex, elementStyles }, setComponentState] = useState<{
    currentIndex: number;
    elementStyles: CSSProperties[];
  }>({ currentIndex: 0, elementStyles: [] });

  const { swipeableProps, swipeNext, swipePrevious, swipeRef, targetIndex } =
    useCarouselSwipe({
      numberOfCards: children.length,
    });

  const updateStyles = useCallback(
    (target: number, overridePosition?: number, projectIndex?: number) => {
      const { animationDuration, cardStyles } = getInfo({
        containerWidth,
        gap,
        numberOfCards: children.length,
        numberOfVisibleCards,
        overridePosition,
        portionsBySize,
        targetIndex,
      });
      if (onCardChangeEnd) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onCardChangeEnd(projectIndex ? projectIndex : target);
        }, animationDuration / 2);
      }

      onCardChangeStart?.();

      setComponentState({ currentIndex: target, elementStyles: cardStyles });
    },
    [containerWidth, targetIndex]
  );

  useEffect(() => {
    updateStyles(targetIndex);
  }, [containerWidth, targetIndex]);

  useEffect(() => {
    bindNext?.(() => {
      swipeNext();
    });
    bindPrev?.(() => {
      swipePrevious();
    });
  }, [swipeNext, swipePrevious]);

  const refSetter = useCallback((node: HTMLDivElement | null) => {
    swipeRef(node);
    if (node !== null) {
      const { width } = node.getBoundingClientRect();

      setContainerWidth(width);
    }
  }, []);

  return (
    <div
      className={styles.carousel}
      onMouseLeave={
        resizeOnHover && revertOnBlur
          ? (): void => {
              if (targetIndex !== currentIndex) {
                updateStyles(targetIndex);
              }
            }
          : undefined
      }
    >
      <div
        className={styles['carousel__list']}
        {...swipeableProps}
        ref={refSetter}
      >
        {children.map((card, cardIndex) => (
          <article
            className={styles['carousel__item']}
            data-carousel-item={cardIndex}
            key={`carousel-item-${cardIndex}`}
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            onMouseOver={
              resizeOnHover
                ? (): void => {
                    if (currentIndex !== cardIndex) {
                      updateStyles(
                        cardIndex,
                        getPositionsToShift({
                          firstVisibleIndex: targetIndex,
                          newIndex: cardIndex,
                          totalCards: children.length,
                          visibleCards: numberOfVisibleCards,
                        })
                      );
                    }
                  }
                : undefined
            }
            style={elementStyles[cardIndex]}
          >
            {card}
          </article>
        ))}
      </div>
    </div>
  );
};
