import { list } from 'radash';

export const makeItems = (
  itemsCount: number,
  activeIndex: number,
  numberOfIndicators: number
): Array<{
  isActive: boolean;
  isHidden: boolean;
  isSmall: boolean;
}> => {
  const numberOfSmallDots = numberOfIndicators - 1;
  const startMiddlePoint = Math.ceil(numberOfSmallDots / 2);
  const endMiddlePoint = itemsCount - Math.ceil(numberOfIndicators / 2) - 1;

  return list(itemsCount - 1).map((i) => {
    const isActive = i === activeIndex;
    let isVisible = false;

    if (isActive) {
      isVisible = true;
    } else if (activeIndex <= startMiddlePoint) {
      if (i < activeIndex || i <= numberOfSmallDots) {
        isVisible = true;
      }
    } else if (activeIndex >= endMiddlePoint) {
      if (i > activeIndex || i >= itemsCount - numberOfSmallDots - 1) {
        isVisible = true;
      }
    } else if (Math.abs(activeIndex - i) <= startMiddlePoint) {
      isVisible = true;
    }
    const isHidden = !isVisible;

    return {
      isActive,
      isHidden,
      isSmall: !isActive && Math.abs(activeIndex - i) !== 1,
    };
  });
};
