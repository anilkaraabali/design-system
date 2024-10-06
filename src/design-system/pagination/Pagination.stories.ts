import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    amountOfPagesShown: 6,
    currentPage: 1,
    limit: 24,
    loading: false,
    pagesAvailable: 10,
    showPages: true,
    total: 100,
  },
} satisfies Story;
