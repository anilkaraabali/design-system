import { GalleryBrowseEnum } from '../GalleryBrowse.enum';
import { GalleryState } from '../make-reducer';

export const getSlidingStyles = (
  state: GalleryState,
  index: number
): React.CSSProperties => {
  const slidingIndexes = state.slidingIndex;
  const isSliding = slidingIndexes.includes(index);

  if (isSliding) {
    if (
      state.isDragging &&
      state.pointerPositionCurrentX !== null &&
      state.pointerPositionStartX !== null
    ) {
      // Dragging & item sliding
      // Set position instantly with current drag value
      const pixels =
        state.pointerPositionCurrentX - state.pointerPositionStartX;
      const style = {
        transform: `translateX(calc(${state.itemsPositionsX[index]}% + ${pixels}px))`,
        transitionDuration: '0ms',
      };

      return style;
    }

    // This case is when user finished dragging or when he just clicked on gallery.
    const style = {
      transform: `translateX(${state.itemsPositionsX[index]}%)`,
      transitionDuration: '300ms',
    };

    if (slidingIndexes.length === 3) {
      // Not browsing or browsing toward next item or browsing toward previous item
      if (
        state.browse === GalleryBrowseEnum.NONE ||
        (state.browse === GalleryBrowseEnum.NEXT &&
          index === slidingIndexes[2]) ||
        (state.browse === GalleryBrowseEnum.PREVIOUS &&
          index === slidingIndexes[0])
      ) {
        // Set position instantly
        style.transitionDuration = '0ms';
      }
    } else if (state.rearranging) {
      style.transitionDuration = '0ms';
    }

    return style;
  }

  // Default behavior
  return {
    transform: `translateX(${state.itemsPositionsX[index]}%)`,
  };
};
