export const getSlidingImagesIndexes = (
  activeIndex: number,
  itemsCount: number
): number[] => [
  (activeIndex - 1 + itemsCount) % itemsCount,
  activeIndex,
  (activeIndex + 1) % itemsCount,
];
