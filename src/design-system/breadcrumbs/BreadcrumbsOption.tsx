import clsx from 'clsx';
import React from 'react';

import { Link, LinkProps } from '../link';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbOptionType = {
  props?: Omit<LinkProps, 'href' | 'icon' | 'size' | 'theme'>;
  title: string;
  url: string;
};

interface BreadcrumbsOptionProps {
  currentIndex: number;
  isFirstOption?: boolean;
  isLastOption?: boolean;
  option: BreadcrumbOptionType;
}

export const BreadcrumbsOption: React.FC<BreadcrumbsOptionProps> = ({
  isFirstOption = true,
  isLastOption = false,
  option,
}) => (
  <li
    className={clsx(styles['breadcrumbs__item'], {
      [styles['breadcrumbs__item--last']]: isLastOption,
    })}
  >
    {!isFirstOption && (
      <span className={styles['breadcrumbs__divider']}>/</span>
    )}
    {isLastOption ? (
      <p
        className={clsx(styles['breadcrumbs__option'], {
          [styles['breadcrumbs__option--last']]: isLastOption,
        })}
        title={option.title}
      >
        {option.title}
      </p>
    ) : (
      <Link
        {...option.props}
        className={clsx(styles['breadcrumbs__option'], option.props?.className)}
        href={option.url}
        title={option.title}
      >
        {option.title}
      </Link>
    )}
  </li>
);
