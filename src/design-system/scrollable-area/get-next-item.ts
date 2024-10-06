import { ScrollableAreaItemsInterface } from './ScrollableArea';

export const getNextScrollItem = (
  items: ScrollableAreaItemsInterface
): number => {
  // Find the first active item
  const lastActiveItem = Object.values(items).reduce((res, current, index) => {
    if (current.entry.intersectionRatio > 0.9) {
      res = index;
    }

    return res;
  }, 0);

  // Get the next item index
  if (lastActiveItem < Object.keys(items).length - 1) {
    const nextItemIndex =
      Object.values(items)
        .splice(lastActiveItem)
        .findIndex((item) => item.entry.intersectionRatio < 0.9) +
      lastActiveItem;

    return nextItemIndex;
  }

  // return the last item
  return Object.keys(items).length - 1;
};
