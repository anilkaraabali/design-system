import { CarouselItemSizeObjectType, CarouselItemSizeType } from '../types';

export const getActiveWidths = ({
  containerWidth,
  gap,
  numberOfVisibleCards,
  portionsBySize,
}: {
  containerWidth: number;
  gap: number;
  numberOfVisibleCards: number;
  portionsBySize: CarouselItemSizeObjectType;
}): number[] => {
  if (!numberOfVisibleCards) {
    return [];
  }
  const availableWidth = containerWidth - (numberOfVisibleCards - 1) * gap;

  const totalNumberOfPortions = Object.keys(portionsBySize).reduce(
    (result, current) =>
      result + (portionsBySize?.[current as CarouselItemSizeType] || 0),
    0
  );

  const portionWidth = availableWidth / totalNumberOfPortions;

  return Object.keys(portionsBySize).reduce<number[]>((result, current) => {
    const portion = portionsBySize[current as CarouselItemSizeType] || 0;
    const sizeWidth = portion * portionWidth;

    result.push(sizeWidth);

    return result;
  }, []);
};
