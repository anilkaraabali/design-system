export const getTransform = (
  items: Array<{
    isHidden: boolean;
  }>,
  itemWidth: number
): number => {
  let transformIndex = 0;

  items.some((item, index) => {
    if (!item.isHidden) {
      return true;
    }

    transformIndex = -(index + 1);

    return false;
  });

  return transformIndex * itemWidth;
};
