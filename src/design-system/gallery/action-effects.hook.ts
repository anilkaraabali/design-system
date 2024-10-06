import { Dispatch, RefObject, useEffect } from 'react';

import { GalleryActionType } from './make-reducer';

export const useGalleryActionEffects = ({
  dispatch,
  galleryRef,
  isMouseOrTouchDown,
  withDrag,
}: {
  dispatch: Dispatch<GalleryActionType>;
  galleryRef: RefObject<HTMLDivElement>;
  isMouseOrTouchDown: boolean;
  withDrag: boolean;
}): void => {
  useEffect(() => {
    if (!isMouseOrTouchDown) {
      return;
    }

    const onMove = (positionX: number, positionY: number): void => {
      dispatch({ positionX, positionY, type: 'move' });
    };
    const onEnd = (e: Event): void => {
      e.stopPropagation();

      dispatch({ type: 'end' });
    };

    const onMouseMove = (e: MouseEvent): void => {
      onMove(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent): void => {
      onMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    };
    const onTouchEnd = (e: TouchEvent): void => {
      onEnd(e);
    };

    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onTouchEnd);

    if (withDrag) {
      galleryRef.current?.addEventListener('mousemove', onMouseMove);
      galleryRef.current?.addEventListener('touchmove', onTouchMove);
    }

    return (): void => {
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchend', onTouchEnd);

      if (withDrag) {
        galleryRef.current?.removeEventListener('mousemove', onMouseMove);
        galleryRef.current?.removeEventListener('touchmove', onTouchMove);
      }
    };
  });
};
