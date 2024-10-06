import { list } from 'radash';
import { CSSProperties } from 'react';

import { getActiveWidths } from './get-active-widths';

export const getInfo = ({
  animationDuration = 1000,
  gap,
  numberOfCards,
  numberOfVisibleCards,
  overridePosition,
  targetIndex,
  ...rest
}: {
  animationDuration?: number;
  numberOfCards: number;
  overridePosition?: number;
  targetIndex: number;
} & Parameters<typeof getActiveWidths>[0]): {
  animationDuration: number;
  cardStyles: CSSProperties[];
} => {
  if (
    !numberOfCards ||
    !numberOfVisibleCards ||
    !rest.containerWidth ||
    !Object.keys(rest.portionsBySize).length
  ) {
    return {
      animationDuration,
      cardStyles: [],
    };
  }

  const sizesWidths = getActiveWidths({
    gap,
    numberOfVisibleCards,
    ...rest,
  });

  const marginToApply = 'marginLeft';

  const marginAnimation: string = `${
    animationDuration / 2
  }ms ease-out ${animationDuration}ms`;

  const cardStyles: CSSProperties[] = list(0, numberOfCards).map(() => ({
    [marginToApply]: gap,
    transition: `width ${animationDuration}ms ease-out, margin ${marginAnimation}`,
    width: 0,
  }));

  const copy = [...sizesWidths];

  /**
   * Will shift the elements of the array by putting the last first
   * Considering that the order of the elements is always from bigger to smaller
   * example: [large, medium, small] -> [small, large, medium]
   * This is necessary only at the end of the list
   */
  const lastFewItems = targetIndex > numberOfCards - numberOfVisibleCards;

  const positionsToShift =
    overridePosition ??
    (lastFewItems ? numberOfVisibleCards - numberOfCards + targetIndex : 0);

  for (let i = 0; i < positionsToShift; i++) {
    const lastElement = copy.pop();
    copy.splice(i, 0, lastElement as number);
  }

  for (let i = 0; i < numberOfVisibleCards; i++) {
    const index = lastFewItems
      ? numberOfCards - numberOfVisibleCards + i
      : i + targetIndex;

    cardStyles[index].width = copy[i];
    cardStyles[index].transition = `width ${
      animationDuration * 1
    }ms ease-out, margin ${i !== 0 ? '0ms ease-out' : marginAnimation}`;
  }

  // Removes the margin from all items that are not visible, excluding the last visible ones
  for (let i = 0; i <= targetIndex; i++) {
    if (lastFewItems && i > numberOfCards - numberOfVisibleCards) {
      break;
    }

    cardStyles[i][marginToApply] = 0;
  }

  cardStyles[cardStyles.length - 1][marginToApply] = gap;

  return {
    animationDuration,
    cardStyles,
  };
};
