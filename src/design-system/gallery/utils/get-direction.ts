import { GalleryScrollDirection } from '../GalleryScrollDirection';

export const getTouchDirection = ({
  pointerPositionSecondX,
  pointerPositionSecondY,
  pointerPositionStartX,
  pointerPositionStartY,
}: {
  pointerPositionSecondX: number;
  pointerPositionSecondY: number;
  pointerPositionStartX: number;
  pointerPositionStartY: number;
}): GalleryScrollDirection => {
  const xDiff = Math.abs(pointerPositionSecondX - pointerPositionStartX);
  const yDiff = Math.abs(pointerPositionSecondY - pointerPositionStartY);

  return xDiff > yDiff ? 'horizontal' : 'vertical';
};
