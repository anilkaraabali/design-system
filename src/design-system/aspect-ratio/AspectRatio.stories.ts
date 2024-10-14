import type { Meta, StoryObj } from '@storybook/react';

import { AspectRatio } from './AspectRatio';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  title: 'Design System/Aspect Ratio',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    ratio: 16 / 9,
    style: { backgroundColor: 'lightgray' },
  },
} satisfies Story;
