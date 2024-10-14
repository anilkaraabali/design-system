import { LocaleType } from '@/model';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { forwardRef, useCallback, useEffect } from 'react';

import { Button, ButtonProps } from '../button';
import { IconChevronLeft, IconChevronRight } from '../icons';
import { Link } from '../link';
import { getPaginationUrl } from './get-pagination-url';
import styles from './Pagination.module.scss';
import { paginationPrepareLinks } from './prepare-links';

interface PaginitionProps extends React.ComponentPropsWithRef<'div'> {
  amountOfPagesShown?: number;
  currentPage: number;
  limit?: number;
  loading: boolean;
  onPageClick?: (page: number) => void;
  pageHref?: (page: number) => string;
  pagesAvailable: number;
  shouldUseNativeNavigation?: boolean;
  showPages?: boolean;
  total?: number;
}

export const Pagination = forwardRef<HTMLDivElement, PaginitionProps>(
  (
    {
      amountOfPagesShown = 6,
      currentPage,
      limit = 25,
      loading,
      onPageClick: onPageClickCb,
      pageHref,
      pagesAvailable,
      shouldUseNativeNavigation,
      showPages,
      total = 0,
      ...rest
    },
    ref
  ) => {
    const t = useTranslations('Common.pagination');
    const router = useRouter();
    const locale = router.locale as LocaleType;

    useEffect(() => {
      const callback = (): void => window.scrollTo({ top: 0 });

      router.events.on('routeChangeStart', callback);

      return (): void => {
        router.events.off('routeChangeStart', callback);
      };
    }, []);

    const nextLink = pageHref
      ? pageHref(currentPage + 1)
      : getPaginationUrl(locale, router.asPath, currentPage + 1);
    const previousLink = pageHref
      ? pageHref(currentPage - 1)
      : getPaginationUrl(locale, router.asPath, currentPage - 1);

    const pageLinks = paginationPrepareLinks({
      amountOfPagesShown,
      currentPage,
      limit,
      locale,
      path: router.asPath,
      total,
    });

    const onPageClick = (
      e: React.MouseEvent,
      href: string,
      page: number
    ): void => {
      e.preventDefault();

      if (onPageClickCb) {
        onPageClickCb(page);
      } else if (shouldUseNativeNavigation) {
        window.location.href = href;
      } else {
        Object.defineProperty(document, 'referrer', {
          configurable: true,
          value: window.location.href,
        });
        router.push(href);
      }
    };

    const isPrevDisabled = loading || currentPage === 1;
    const isNextDisabled = loading || currentPage === pagesAvailable;
    const isPagesAvailable = !!(
      showPages &&
      amountOfPagesShown &&
      amountOfPagesShown > 0
    );

    const Disabled = useCallback<React.FC<Partial<ButtonProps>>>(
      (props) => (
        <Button
          {...props}
          className={styles['pagination__link--disabled']}
          disabled
          size='small'
          theme='secondary'
        />
      ),
      []
    );

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['pagination'],
          {
            [styles['pagination--disabled']]: !isPagesAvailable,
          },
          rest.className
        )}
      >
        {isPrevDisabled ? (
          <Disabled
            aria-label={t('prev.label')}
            icon={{
              component: IconChevronLeft,
              position: 'prefix',
              props: {
                className: clsx({
                  [styles['pagination__icon--prev']]: !isPagesAvailable,
                  [styles['pagination__icon']]: !isPagesAvailable,
                }),
              },
            }}
          >
            {!isPagesAvailable && t('prev.label')}
          </Disabled>
        ) : (
          <Link
            aria-label={t('prev.ariaLabel')}
            className={styles['pagination__link']}
            href={previousLink}
            icon={{
              component: IconChevronLeft,
              position: 'prefix',
              props: {
                className: clsx({
                  [styles['pagination__icon--prev']]: !isPagesAvailable,
                  [styles['pagination__icon']]: !isPagesAvailable,
                }),
              },
            }}
            key='prev'
            onClick={(e) => onPageClick(e, previousLink, currentPage - 1)}
            size='small'
            theme='secondary'
          >
            {!isPagesAvailable && t('prev.label')}
          </Link>
        )}
        {isPagesAvailable && (
          <div className={styles['pagination__pages']}>
            {pageLinks.map((k, index) =>
              currentPage === k.page ? (
                <Button
                  aria-label={t('current.ariaLabel', { page: k.text })}
                  className={clsx(
                    styles['pagination__link'],
                    styles['pagination__link--selected']
                  )}
                  key={k.text}
                  size='small'
                  theme='tertiary'
                >
                  {k.text}
                </Button>
              ) : (
                <Link
                  aria-label={t('goTo.ariaLabel', { page: k.text })}
                  className={styles['pagination__link']}
                  href={pageHref ? pageHref(index + 1) : k.href}
                  key={k.text}
                  onClick={(e): void => onPageClick(e, k.href, k.page)}
                  size='small'
                  theme='tertiary'
                >
                  {k.text}
                </Link>
              )
            )}
          </div>
        )}
        {isNextDisabled ? (
          <Disabled
            aria-label={t('next.ariaLabel')}
            icon={{
              component: IconChevronRight,
              position: 'prefix',
              props: {
                className: clsx({
                  [styles['pagination__icon--next']]: !isPagesAvailable,
                  [styles['pagination__icon']]: !isPagesAvailable,
                }),
              },
            }}
          >
            {!isPagesAvailable && t('next.label')}
          </Disabled>
        ) : (
          <Link
            aria-label={t('next.ariaLabel')}
            className={styles['pagination__link']}
            href={nextLink}
            icon={{
              component: IconChevronRight,
              position: 'prefix',
              props: {
                className: clsx({
                  [styles['pagination__icon--next']]: !isPagesAvailable,
                  [styles['pagination__icon']]: !isPagesAvailable,
                }),
              },
            }}
            key='next'
            onClick={(e) => onPageClick(e, nextLink, currentPage + 1)}
            size='small'
            theme='secondary'
          >
            {!isPagesAvailable && t('next.label')}
          </Link>
        )}
      </div>
    );
  }
);
