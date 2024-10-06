import { Skeleton } from '@/design-system/skeleton';
import clsx from 'clsx';
import React from 'react';

import styles from './ProductCardSkeleton.module.scss';

interface ProductCardSkeletonProps
  extends React.ComponentPropsWithoutRef<'article'> {}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = (
  props
) => (
  <article {...props} className={clsx(styles['skeleton'], props.className)}>
    <div className={styles['skeleton__media']}>
      <Skeleton height='100%' variant='rectangular' />
    </div>
    <div className={styles['skeleton__content']}>
      <Skeleton height={18} width='75%' />
      <Skeleton height={18} width={100} />
    </div>
  </article>
);
