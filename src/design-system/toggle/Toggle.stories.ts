import type { Meta, StoryObj } from '@storybook/react';

import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['big', 'default'],
    },
  },
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    checked: true,
  },
} satisfies Story;
