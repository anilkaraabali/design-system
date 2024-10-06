import type { Meta, StoryObj } from '@storybook/react';

import { CircularProgress } from './CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'default', 'large', 'xlarge'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
  component: CircularProgress,
  title: 'Design-System/Circular Progress',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    size: 'default',
    theme: 'light',
  },
} satisfies Story;
