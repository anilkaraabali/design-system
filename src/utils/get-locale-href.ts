import { LocaleType } from '@/model';

export const localeGetHref = ({
  locale,
  path,
  relative = false,
  shouldDecode = true,
}: {
  locale: LocaleType;
  path: string;
  relative?: boolean;
  shouldDecode?: boolean;
  shouldDeleteQuery?: boolean;
}): string => {
  const isHome = path === '/';

  const relativeUrl = isHome ? path : `/${locale}${isHome ? '' : path}`;
  const url = relative ? relativeUrl : `${origin}${relativeUrl}`;

  // We should decode so that decoded url is used on both server and client side.
  return shouldDecode ? decodeURI(url) : url;
};
