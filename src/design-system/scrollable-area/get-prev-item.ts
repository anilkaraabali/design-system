import { ScrollableAreaItemsInterface } from './ScrollableArea';

export const getPrevScrollItem = (
  items: ScrollableAreaItemsInterface
): number => {
  // Find the first active item
  const firstActiveItemIndex = Object.values(items).findIndex(
    (item) => item.entry.intersectionRatio > 0.9
  );

  // return the previous item
  return firstActiveItemIndex > 0 ? firstActiveItemIndex - 1 : 0;
};
