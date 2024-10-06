import { LocaleType } from '@/model';

import { paginationGetElements } from './get-elements';
import { getPaginationUrl } from './get-pagination-url';
import { PaginationLinkProps } from './types';

const getLinkParams = ({
  locale,
  page,
  path,
  text,
}: {
  locale: LocaleType;
  page: number;
  path: string;
  text: string;
}): PaginationLinkProps => ({
  href: getPaginationUrl(locale, path, page),
  page,
  text,
});

export const paginationPrepareLinks = ({
  locale,
  path,
  ...props
}: {
  amountOfPagesShown: number;
  currentPage: number;
  limit: number;
  locale: LocaleType;
  path: string;
  total: number;
}): PaginationLinkProps[] =>
  paginationGetElements<PaginationLinkProps>({
    ...props,
    mapper: (item) =>
      getLinkParams({ locale, page: item, path, text: String(item) }),
  });
