import type { Meta, StoryObj } from '@storybook/react';

import { ProductCard } from './ProductCard';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  title: 'Components/Product/Product Card',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    onFavoriteClick: () => {
      alert('Favorite clicked');
    },
    product: {
      id: '1',
      images: [
        'https://static.zarahome.net/assets/public/b2b7/eec1/9c744006b730/cbe73158973f/44596013409-a7/44596013409-a7.jpg?ts=1723562922607',
        'https://static.zarahome.net/assets/public/0e7a/006f/fd7d4771b671/dedfa891424d/44596013409-p1/44596013409-p1.jpg?ts=1723632135549',
        'https://static.zarahome.net/assets/public/4c3d/1ab9/805a45769e10/b9b965e123e9/44596013409-a3/44596013409-a3.jpg?ts=1723632129979',
        'https://static.zarahome.net/assets/public/3cc6/09d9/25944f4686f5/fcecc72f8aa5/44596013409-a1/44596013409-a1.jpg?ts=1723632129275',
      ].map((url) => ({
        altText: 'PACK OF COTTON HAND TOWELS',
        height: 500,
        url,
        width: 500,
      })),
      priceRange: {
        maxVariantPrice: '$80',
        minVariantPrice: '$60',
      },
      salePriceRange: null,
      title: 'PACK OF COTTON HAND TOWELS',
      url: 'https://example.com',
      variants: {
        colors: ['apricot', 'azur', 'beige', 'blau'],
        sizes: [],
      },
    },
    showFavorite: true,
    style: { maxWidth: 316, width: '100%' },
  },
} satisfies Story;
