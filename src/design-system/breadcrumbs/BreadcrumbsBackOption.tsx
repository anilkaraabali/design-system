import { IconChevronLeft } from '@/design-system/icons';
import clsx from 'clsx';
import React from 'react';

import { Link } from '../link';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbOptionType } from './BreadcrumbsOption';

interface BreadcrumbsBackOptionProps {
  backLink: BreadcrumbOptionType;
}

export const BreadcrumbsBackOption: React.FC<BreadcrumbsBackOptionProps> = ({
  backLink,
}) => (
  <div
    className={clsx(
      styles['breadcrumbs__item'],
      styles['breadcrumbs__item--back']
    )}
  >
    <IconChevronLeft
      className={clsx(
        styles['breadcrumbs__icon'],
        styles['breadcrumbs__icon--back']
      )}
    />
    <Link
      {...backLink.props}
      className={clsx(styles['breadcrumbs__option'], backLink.props?.className)}
      href={backLink.url}
      title={backLink.title}
    >
      {backLink.title}
    </Link>
    <div className={styles['breadcrumbs__divider']}>|</div>
  </div>
);
