import { GalleryBrowseEnum } from '../GalleryBrowse.enum';
import { GalleryState } from '../make-reducer';
import { computeItemPositionsXUpdate } from './compute-item-positions-x-update';
import { getSlidingImagesIndexes } from './get-sliding-images-indexes';

export const makeInitialState = (
  initialIndex: number,
  items: React.ReactElement[]
): GalleryState => {
  const slidingIndex = getSlidingImagesIndexes(initialIndex, items.length);

  return {
    activeIndex: initialIndex,
    browse: GalleryBrowseEnum.NONE,
    directNavigation: false,
    goTo: null,
    isDragging: false,
    isTouched: false,
    itemsPositionsX: items.reduce(
      (acc, _, index) => {
        if (acc[index] !== undefined) {
          return acc;
        }
        return { ...acc, [index]: 100 };
      },
      computeItemPositionsXUpdate({
        itemsCount: items.length,
        slidingIndex,
      })
    ),
    pointerPositionCurrentX: null,
    pointerPositionStartX: null,
    pointerPositionStartY: null,
    rearranging: false,
    scrollDirection: null,
    slidingIndex,
    zoomIn: false,
  };
};
