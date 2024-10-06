import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  argTypes: {
    shape: {
      control: { type: 'radio' },
      options: ['default', 'rounded'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: { type: 'radio' },
      options: ['sale'],
    },
  },
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: '%20 off',
    shape: 'default',
    size: 'small',
  },
} satisfies Story;
