import { LocaleType } from '@/model';
import { localeGetHref } from '@/utils/get-locale-href';
import { urlQueryDelete } from '@/utils/url-query/delete';
import { urlQueryUpdate } from '@/utils/url-query/update';

export const getPaginationUrl = (
  locale: LocaleType,
  path: string,
  page: number
): string => {
  if (page === 1) {
    return urlQueryDelete(
      localeGetHref({ locale, path, relative: true }),
      'page'
    );
  }

  return urlQueryUpdate(localeGetHref({ locale, path, relative: true }), {
    page,
  });
};
