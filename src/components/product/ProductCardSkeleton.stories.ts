import type { Meta, StoryObj } from '@storybook/react';

import { ProductCardSkeleton } from './ProductCardSkeleton';

const meta: Meta<typeof ProductCardSkeleton> = {
  component: ProductCardSkeleton,
  title: 'Components/Product/Product Card Skeleton',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    style: { maxWidth: 400 },
  },
} satisfies Story;
