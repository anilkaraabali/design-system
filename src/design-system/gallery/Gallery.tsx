import { useConstructor, usePrevious } from '@/hooks';
import { useGlobal } from '@/store/global';
import clsx from 'clsx';
import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { IconChevronLeft, IconChevronRight } from '../icons';
import { Indicator } from '../indicator/Indicator';
import { NavigationArrows, NavigationArrowsProps } from '../navigation-arrows';
import { useGalleryActionEffects } from './action-effects.hook';
import styles from './Gallery.module.scss';
import { makeReducer } from './make-reducer';
import { makeInitialState } from './utils/get-initial-state';
import { getSlidingStyles } from './utils/get-sliding-styles';

export interface GalleryProps extends React.ComponentPropsWithRef<'div'> {
  bindGoTo?: (
    goTo: (
      index: number,
      ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void
  ) => void;
  children: React.ReactElement[];
  initialIndex?: number;
  itemClassName?: string;
  navigationArrowsProps?: NavigationArrowsProps;
  numberOfIndicators?: number;
  onActiveIndexChange?: (index: number, length: number) => void;
  onDrag?: () => void;
  onTouch?: () => void;
  renderAllItemsOnLoad?: boolean;
  withArrowNavigation?: boolean;
  withDotIndicators?: boolean;
  withDrag?: boolean;
  withKeyboardNavigation?: boolean;
}

export const Gallery = forwardRef<HTMLDivElement, GalleryProps>(
  (
    {
      bindGoTo,
      children = [],
      initialIndex = 0,
      itemClassName,
      navigationArrowsProps,
      numberOfIndicators,
      onActiveIndexChange,
      onDrag,
      onTouch,
      renderAllItemsOnLoad = false,
      withDotIndicators = true,
      ...props
    },
    ref
  ) => {
    const { isMobile, isTouchable } = useGlobal();
    const {
      withArrowNavigation = !isTouchable,
      withDrag = isMobile,
      withKeyboardNavigation = !isTouchable,
      ...rest
    } = props;

    const galleryRef = useRef<HTMLDivElement | null>(null);
    const elementRef = useCallback(
      (node: HTMLDivElement) => {
        if (node) {
          galleryRef.current = node;
          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              ref.current = node;
            }
          }
        }
      },
      [children]
    );

    const numberOfImages = children.length;
    const hasMultipleImages = numberOfImages > 1;

    const [reducer] = useState(() => makeReducer(numberOfImages));
    const [initialReducerState] = useState(() =>
      makeInitialState(initialIndex, children)
    );
    const [state, dispatch] = useReducer(reducer, initialReducerState);
    const { activeIndex } = state;

    useGalleryActionEffects({
      dispatch,
      galleryRef,
      isMouseOrTouchDown: state.pointerPositionStartX !== null,
      withDrag,
    });
    const prevActiveIndex = usePrevious(activeIndex);
    if (prevActiveIndex !== null && prevActiveIndex !== activeIndex) {
      // should use setTimeout, otherwise callback code can not use react setState
      setTimeout(() => onActiveIndexChange?.(activeIndex, numberOfImages));
    }

    const onStart = (positionX: number, positionY: number): void => {
      if (state.zoomIn) return;

      const galleryRect = (
        galleryRef.current as HTMLDivElement
      ).getBoundingClientRect();
      dispatch({
        galleryLeft: galleryRect.left,
        galleryRight: galleryRect.right,
        positionX,
        positionY,
        type: 'start',
      });
      onTouch?.();
    };

    useConstructor(() => {
      bindGoTo?.((newIndex, ev) => {
        const galleryRect = (
          galleryRef.current as HTMLDivElement
        ).getBoundingClientRect();

        dispatch({
          galleryLeft: galleryRect.left,
          galleryRight: galleryRect.right,
          positionX: ev.clientX,
          positionY: ev.clientY,
          type: 'start',
        });
        dispatch({
          directNavigation: true,
          index: newIndex,
          type: 'rearrange',
        });
      });
    });

    const handleClickLeft = useCallback((): void => {
      const newIndex =
        (((activeIndex + -1) % numberOfImages) + numberOfImages) %
        numberOfImages;

      dispatch({ directNavigation: false, index: newIndex, type: 'rearrange' });
    }, [state.activeIndex]);

    const handleClickRight = useCallback((): void => {
      const newIndex =
        (((activeIndex + 1) % numberOfImages) + numberOfImages) %
        numberOfImages;

      dispatch({ directNavigation: false, index: newIndex, type: 'rearrange' });
    }, [state.activeIndex]);

    const handleTouchStart = useCallback(
      (e: React.TouchEvent<HTMLDivElement>): void => {
        dispatch({
          type: 'zoom',
          zoomIn: (window.visualViewport as VisualViewport).scale > 1,
        });
        onStart(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
      },
      []
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
      },
      []
    );

    useEffect(() => {
      if (state.rearranging) {
        dispatch({ index: state.goTo as number, type: 'goto' });
      }
    }, [state.rearranging]);

    useEffect(() => {
      if (state.isDragging) {
        onDrag?.();
      }
    }, [state.isDragging]);

    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent): void => {
        if (e.key === 'ArrowLeft') {
          handleClickLeft();
        } else if (e.key === 'ArrowRight') {
          handleClickRight();
        }
      };

      if (withKeyboardNavigation) {
        window.addEventListener('keydown', handleKeydown);
      }

      return (): void => {
        if (withKeyboardNavigation) {
          window.removeEventListener('keydown', handleKeydown);
        }
      };
    }, [handleClickLeft, handleClickRight]);

    return (
      <div
        aria-label='Photos gallery'
        role='button'
        tabIndex={0}
        {...rest}
        className={clsx(styles['gallery'], rest.className)}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        ref={elementRef}
      >
        {(state.isTouched || renderAllItemsOnLoad
          ? children
          : children.slice(state.activeIndex, state.activeIndex + 1)
        ).map((item, i) => (
          <div
            className={clsx(
              styles['gallery__item'],
              {
                [styles['gallery__item--sliding']]:
                  (state.isTouched || renderAllItemsOnLoad) &&
                  state.activeIndex !== i,
              },
              itemClassName
            )}
            key={i}
            style={hasMultipleImages ? getSlidingStyles(state, i) : undefined}
          >
            {item}
          </div>
        ))}
        {withDotIndicators && (
          <Indicator
            activeIndex={state.activeIndex}
            className={styles['gallery__indicators']}
            itemsCount={children.length}
            itemWidth={10}
            numberOfIndicators={numberOfIndicators}
          />
        )}
        {withArrowNavigation && (
          <NavigationArrows
            as={Fragment}
            nextProps={{
              icon: {
                component: IconChevronRight,
                position: 'prefix',
              },
              ...navigationArrowsProps?.nextProps,
              className: clsx(
                styles['gallery__arrow'],
                styles['gallery__arrow--next'],
                navigationArrowsProps?.nextProps?.className
              ),
              onClick: handleClickRight,
            }}
            prevProps={{
              icon: {
                component: IconChevronLeft,
                position: 'prefix',
              },
              ...navigationArrowsProps?.prevProps,
              className: clsx(
                styles['gallery__arrow'],
                styles['gallery__arrow--prev'],
                navigationArrowsProps?.prevProps?.className
              ),
              onClick: handleClickLeft,
            }}
          />
        )}
      </div>
    );
  }
);
