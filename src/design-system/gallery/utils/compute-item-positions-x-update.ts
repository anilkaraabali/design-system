export const computeItemPositionsXUpdate = ({
  directNavigation,
  isDragging,
  itemsCount,
  rearrange,
  slidingIndex,
}: {
  directNavigation?: boolean;
  isDragging?: boolean;
  itemsCount: number;
  rearrange?: boolean;
  slidingIndex: number[];
}): Record<string, number> => {
  const itemsPositionsXUpdate: Record<string, number> = {};

  if (isDragging) {
    slidingIndex.forEach((itemIndex, i) => {
      itemsPositionsXUpdate[itemIndex] = (-100 + 100 * i) * 1;
    });
  } else {
    const navigatingFromEndToEnd =
      slidingIndex[0] % (itemsCount - 1) === 0 &&
      slidingIndex[1] % (itemsCount - 1) === 0;
    const multiplier =
      (slidingIndex[0] > slidingIndex[1] ? 1 : -1) *
      (rearrange ? -1 : 1) *
      1 *
      (navigatingFromEndToEnd ? (directNavigation ? 1 : -1) : 1);

    itemsPositionsXUpdate[slidingIndex[rearrange ? 0 : 1]] = 0;
    itemsPositionsXUpdate[slidingIndex[rearrange ? 1 : 0]] = 100 * multiplier;
  }

  return itemsPositionsXUpdate;
};
