export function getPositionsToShift({
  firstVisibleIndex,
  newIndex,
  totalCards,
  visibleCards,
}: {
  firstVisibleIndex: number;
  newIndex: number;
  totalCards: number;
  visibleCards: number;
}): number {
  const result = [];
  const start =
    firstVisibleIndex <= totalCards - visibleCards
      ? firstVisibleIndex
      : totalCards - visibleCards;

  for (let i = 0; i < visibleCards; i++) {
    result.push(start + i);
  }

  return result.indexOf(newIndex);
}
