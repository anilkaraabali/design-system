import type { Meta, StoryObj } from '@storybook/react';

import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['info', 'warning', 'critical', 'success'],
    },
  },

  component: Banner,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    status: 'info',
    text: 'Banner informs users about important changes or conditions in the interface.',
  },
} satisfies Story;
