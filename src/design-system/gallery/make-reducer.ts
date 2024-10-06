import { Reducer } from 'react';

import { GalleryBrowseEnum } from './GalleryBrowse.enum';
import { GalleryScrollDirection } from './GalleryScrollDirection';
import { computeItemPositionsXUpdate } from './utils/compute-item-positions-x-update';
import { getBrowseOnUserTouchDown } from './utils/get-browse-user-on-touch-down';
import { getTouchDirection } from './utils/get-direction';
import { getSlidingImagesIndexes } from './utils/get-sliding-images-indexes';

export type GalleryActionType =
  | {
      galleryLeft: number;
      galleryRight: number;
      positionX: number;
      positionY: number;
      type: 'start';
    }
  | {
      positionX: number;
      positionY: number;
      type: 'move';
    }
  | { directNavigation: boolean; index: number; type: 'rearrange' }
  | { index: number; type: 'goto' }
  | { type: 'end' }
  | { type: 'zoom'; zoomIn: boolean };

export type GalleryState = {
  activeIndex: number;
  browse: GalleryBrowseEnum;
  directNavigation: boolean;
  goTo: null | number;
  isDragging: boolean;
  isTouched: boolean;
  itemsPositionsX: Record<string, number>;
  pointerPositionCurrentX: null | number;
  pointerPositionStartX: null | number;
  pointerPositionStartY: null | number;
  rearranging: boolean;
  scrollDirection: GalleryScrollDirection | null;
  slidingIndex: number[];
  zoomIn: boolean;
};

const DRAG_DELTA_MIN = 10;

export const makeReducer: (
  itemsCount: number
) => Reducer<GalleryState, GalleryActionType> =
  (itemsCount) =>
  (state, action): GalleryState => {
    switch (action.type) {
      case 'move':
        if (
          state.pointerPositionStartX !== null &&
          state.pointerPositionStartY !== null
        ) {
          const pointerPositionCurrentX = action.positionX;
          const pointerPositionDelta =
            state.pointerPositionStartX - pointerPositionCurrentX;

          const scrollDirection = state.scrollDirection
            ? state.scrollDirection
            : getTouchDirection({
                pointerPositionSecondX: action.positionX,
                pointerPositionSecondY: action.positionY,
                pointerPositionStartX: state.pointerPositionStartX,
                pointerPositionStartY: state.pointerPositionStartY,
              });

          const nextState = {
            ...state,
            pointerPositionCurrentX,
            scrollDirection,
          };

          if (
            scrollDirection === 'horizontal' &&
            Math.abs(pointerPositionDelta) > DRAG_DELTA_MIN
          ) {
            return {
              ...nextState,
              isDragging: true,
            };
          }

          return nextState;
        }
        break;

      case 'end':
        {
          if (
            state.scrollDirection === 'vertical' ||
            state.pointerPositionCurrentX === null ||
            state.pointerPositionCurrentX === state.pointerPositionStartX
          ) {
            return {
              ...state,
              isDragging: false,
              pointerPositionCurrentX: null,
              pointerPositionStartX: null,
            };
          }

          const { activeIndex, itemsPositionsX } = state;

          if (
            state.pointerPositionStartX !== null &&
            state.pointerPositionCurrentX !== null
          ) {
            const pointerPositionDelta =
              state.pointerPositionStartX - state.pointerPositionCurrentX;
            const indexDelta =
              1 *
              (state.isDragging
                ? pointerPositionDelta < 0
                  ? -1
                  : 1
                : state.browse === GalleryBrowseEnum.NEXT
                  ? 1
                  : -1);
            const newIndex =
              (((activeIndex + indexDelta) % itemsCount) + itemsCount) %
              itemsCount;

            const slidingIndex = getSlidingImagesIndexes(newIndex, itemsCount);

            return {
              ...state,
              activeIndex: newIndex,
              browse: state.isDragging
                ? indexDelta > 0
                  ? GalleryBrowseEnum.NEXT
                  : GalleryBrowseEnum.PREVIOUS
                : state.browse,
              isDragging: false,
              itemsPositionsX: {
                ...itemsPositionsX,
                ...computeItemPositionsXUpdate({
                  isDragging: state.isDragging,
                  itemsCount,
                  slidingIndex,
                }),
              },
              pointerPositionCurrentX: null,
              pointerPositionStartX: null,
              slidingIndex,
            };
          }
        }
        break;

      case 'start':
        return {
          ...state,
          browse: getBrowseOnUserTouchDown(
            action.positionX,
            (action.galleryRight - action.galleryLeft) / 2
          ),
          isDragging: false,
          isTouched: true,
          pointerPositionCurrentX: action.positionX,
          pointerPositionStartX: action.positionX,
          pointerPositionStartY: action.positionY,
          scrollDirection: null,
        };

      case 'goto': {
        const { activeIndex, directNavigation, itemsPositionsX, slidingIndex } =
          state;

        return {
          ...state,
          activeIndex: action.index,
          browse:
            action.index > activeIndex
              ? GalleryBrowseEnum.NEXT
              : GalleryBrowseEnum.PREVIOUS,
          goTo: null,
          itemsPositionsX: {
            ...itemsPositionsX,
            ...computeItemPositionsXUpdate({
              directNavigation,
              itemsCount,
              slidingIndex,
            }),
          },
          rearranging: false,
        };
      }
      case 'rearrange': {
        const { activeIndex, itemsPositionsX } = state;
        const slidingIndex = [activeIndex, action.index];

        if (activeIndex === action.index) {
          return {
            ...state,
            isTouched: true,
          };
        }

        return {
          ...state,
          activeIndex,
          directNavigation: action.directNavigation,
          goTo: action.index,
          isDragging: false,
          isTouched: true,
          itemsPositionsX: {
            ...itemsPositionsX,
            ...computeItemPositionsXUpdate({
              directNavigation: action.directNavigation,
              itemsCount,
              rearrange: true,
              slidingIndex,
            }),
          },
          pointerPositionCurrentX: null,
          pointerPositionStartX: null,
          rearranging: true,
          slidingIndex,
        };
      }
      case 'zoom':
        return {
          ...state,
          zoomIn: action.zoomIn,
        };
    }
    return state;
  };
