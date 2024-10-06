import clsx from 'clsx';
import React from 'react';

import { Container } from '../container';
import styles from './Breadcrumbs.module.scss';
import { BreadcrumbsBackOption } from './BreadcrumbsBackOption';
import { BreadcrumbOptionType, BreadcrumbsOption } from './BreadcrumbsOption';

export interface BreadcrumbsProps
  extends React.ComponentPropsWithoutRef<'nav'> {
  backLink?: BreadcrumbOptionType;
  options: BreadcrumbOptionType[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  backLink,
  options,
  ...rest
}) => (
  <Container
    aria-label={'Navigation menu (breadcrumbs)'}
    as='nav'
    {...rest}
    className={clsx(styles['breadcrumbs'], rest.className)}
    fluid
  >
    {backLink?.title && <BreadcrumbsBackOption backLink={backLink} />}
    <ol className={styles['breadcrumbs__list']}>
      {options.map((option, index, currentArray) => {
        const isLast = index === currentArray.length - 1;

        return (
          <BreadcrumbsOption
            currentIndex={index}
            isFirstOption={index === 0}
            isLastOption={isLast}
            key={index + 1}
            option={option}
          />
        );
      })}
    </ol>
  </Container>
);
