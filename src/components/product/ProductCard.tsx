import { Button } from '@/design-system/button';
import { GalleryAsync } from '@/design-system/gallery/GalleryAsync';
import { IconHeart } from '@/design-system/icons';
import { Tag } from '@/design-system/tag';
import { useGlobal } from '@/store/global';
import clsx from 'clsx';
import Image from 'next/image';
import { capitalize } from 'radash';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';

import { colorMapping } from './color.mapping';
import styles from './ProductCard.module.scss';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { IProduct } from './types';

export interface ProductCardProps
  extends React.ComponentPropsWithRef<'article'> {
  fetchPriority?: 'auto' | 'high' | 'low';
  isLoading?: boolean;
  onFavoriteClick?: () => void;
  product: IProduct;
  showFavorite?: boolean;
}

export const ProductCard = forwardRef<HTMLElement, ProductCardProps>(
  (
    {
      fetchPriority,
      isLoading,
      onFavoriteClick,
      product,
      showFavorite = true,
      ...rest
    },
    ref
  ) => {
    const { isMobile, isTouchable } = useGlobal();

    const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

    const [galleryIndex, setGalleryIndex] = useState(0);
    const [showToggleableAreas, setShowToggleableAreas] = useState(false);

    const price = useMemo(() => {
      const minPrice = product.priceRange.minVariantPrice;
      const maxPrice = product.priceRange.maxVariantPrice;

      return minPrice === maxPrice
        ? `${minPrice} €`
        : `${minPrice} € - ${maxPrice} €`;
    }, [product.priceRange]);

    const isOnSale = useMemo(
      () =>
        product.salePriceRange &&
        product.salePriceRange.minVariantPrice !==
          product.priceRange.minVariantPrice,
      [product.salePriceRange]
    );

    const salePrice = useMemo(() => {
      if (!product.salePriceRange) {
        return null;
      }

      const minPrice = product.salePriceRange.minVariantPrice;
      const maxPrice = product.salePriceRange.maxVariantPrice;

      return minPrice === maxPrice
        ? `${minPrice} €`
        : `${minPrice} € - ${maxPrice} €`;
    }, [product.salePriceRange]);

    const discount = useMemo(() => {
      if (!product.salePriceRange) {
        return null;
      }

      const regularPrice = parseFloat(product.salePriceRange.maxVariantPrice);
      const salePrice = parseFloat(product.priceRange.maxVariantPrice);

      const discountAmount = regularPrice - salePrice;
      const discountPercentage = (discountAmount / regularPrice) * 100;

      return discountPercentage === 0
        ? null
        : `-${Math.floor(discountPercentage)}%`;
    }, [product.salePriceRange]);

    const animatedClasses = clsx(styles['card__animated'], {
      [styles['card__animated--hidden']]: !showToggleableAreas,
    });

    const galleryImages = useMemo(
      () =>
        product.images.map((image, index) => (
          <a
            className={styles['card__gallery__link']}
            href={product.url}
            key={index}
            title={product.title}
          >
            <Image
              alt={product.title}
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P79+38ACbMD5cm3NskAAAAASUVORK5CYII='
              fill
              loading={fetchPriority === 'high' ? 'eager' : 'lazy'}
              placeholder='blur'
              priority={fetchPriority === 'high'}
              quality={100}
              sizes='100%'
              src={image.url}
              style={{ objectFit: 'cover' }}
            />
          </a>
        )),
      [product.images]
    );

    useEffect(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (galleryIndex === 0) {
        setShowToggleableAreas(galleryIndex === 0);
      } else {
        setShowToggleableAreas(false);
        timeoutRef.current = setTimeout(() => {
          setShowToggleableAreas(true);
        }, 3000);
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [galleryIndex]);

    if (isLoading) {
      return <ProductCardSkeleton />;
    }

    return (
      <article
        id={product.id}
        ref={ref}
        {...rest}
        className={clsx(styles['card'], rest.className)}
      >
        <div className={styles['card__top']}>
          <GalleryAsync
            className={styles['card__gallery']}
            onActiveIndexChange={(index) => {
              setGalleryIndex(index);
            }}
            withArrowNavigation={!isTouchable}
            withDrag={isTouchable}
          >
            {galleryImages}
          </GalleryAsync>
          {discount && (
            <Tag
              className={clsx(styles['card__badge'], animatedClasses)}
              size={isMobile ? 'small' : 'medium'}
              type='sale'
            >
              {discount}
            </Tag>
          )}
          {showFavorite && (
            <div className={styles['card__quick-actions']}>
              <Button
                className={styles['card__favorite']}
                icon={{
                  component: IconHeart,
                  position: 'prefix',
                }}
                onClick={onFavoriteClick}
                size='small'
                theme='tertiary'
              />
            </div>
          )}
        </div>
        <div className={styles['card__content']}>
          <a
            className={styles['card__link']}
            href={product.url}
            title={product.title}
          >
            <h3 className={styles['card__title']}>{product.title}</h3>
            <div className={styles['card__prices']}>
              <div
                className={clsx(styles['card__price'], {
                  [styles['card__price--strike']]: isOnSale,
                })}
              >
                {(salePrice || price).replaceAll('.', ',')}
              </div>
              {isOnSale && (
                <div
                  className={clsx(
                    styles['card__price'],
                    styles['card__price--sale']
                  )}
                >
                  {price.replaceAll('.', ',')}
                </div>
              )}
            </div>
          </a>
          {product.variants.colors.length > 1 && (
            <div className={styles['card__colors']}>
              {product.variants.colors.slice(0, 3).map((color, index) => (
                <a
                  className={clsx(styles['card__color'], {
                    [styles['card__color--active']]: index === 0,
                  })}
                  href={product.url}
                  key={color}
                  style={{
                    backgroundColor: colorMapping[color.toLocaleLowerCase()],
                  }}
                  title={capitalize(color)}
                />
              ))}
              {product.variants.colors.length > 3 && (
                <div className={styles['card__color-more']}>
                  +{product.variants.colors.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }
);
