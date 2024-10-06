import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    height: '100px',
    variant: 'rectangular',
    width: '300px',
  },
} satisfies Story;
