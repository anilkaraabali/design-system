import type { Meta, StoryObj } from '@storybook/react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  component: Rating,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    value: 3,
  },
} satisfies Story;
