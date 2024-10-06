import type { Meta, StoryObj } from '@storybook/react';

import { Portal } from './Portal';

const meta: Meta<typeof Portal> = {
  component: Portal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: <div>Base</div>,
    rootId: 'custom-root',
  },
} satisfies Story;
