import { usePageIsLoading } from '@/hooks';
import { useGlobal } from '@/store/global';
import { useMemo } from 'react';

import { ProductCard } from './ProductCard';
import styles from './ProductList.module.scss';
import { IProduct } from './types';

interface ProductListProps {
  isActive?: boolean;
  products: IProduct[];
}

export const ProductList = ({
  isActive = false,
  products,
}: ProductListProps) => {
  const isPageLoading = usePageIsLoading();
  const { isMobile } = useGlobal();

  const gridCount = useMemo(
    () => (isActive ? (isMobile ? 1 : 6) : isMobile ? 2 : 4),
    [isActive, isMobile]
  );

  return (
    <div
      className={styles['product-list']}
      style={{ '--grid-count': gridCount } as React.CSSProperties}
    >
      {products.map((product, index) => (
        <ProductCard
          fetchPriority={index < 4 ? 'high' : 'auto'}
          isLoading={isPageLoading}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};
