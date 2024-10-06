export const paginationGetElements = <T = number>({
  amountOfPagesShown,
  currentPage,
  limit,
  mapper,
  total,
}: {
  amountOfPagesShown: number;
  currentPage: number;
  limit: number;
  mapper: (item: number) => T;
  total: number;
}): T[] => {
  let links: T[] = [];
  const halfAmountOfPages = Math.floor(amountOfPagesShown / 2);
  const pageCount = Math.ceil(total / limit);
  const maxPageIndex = pageCount - 1;
  for (let i = 1; i <= pageCount; i++) {
    links.push(mapper(i));
  }

  if (currentPage <= halfAmountOfPages) {
    links = links.slice(0, amountOfPagesShown);
  } else {
    const maxIndex = currentPage + halfAmountOfPages - 1;
    let minIndex = currentPage - halfAmountOfPages - 1;
    if (maxIndex > maxPageIndex) {
      minIndex -= maxIndex - maxPageIndex;
    }

    if (amountOfPagesShown % 2 === 0) {
      minIndex = minIndex + 1;
    }

    minIndex = minIndex < 0 ? 0 : minIndex;
    links = links.slice(minIndex, maxIndex + 1);
  }

  return links;
};
