import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    backLink: {
      title: 'Back to',
      url: 'https://example.com',
    },
    options: [
      {
        title: 'Home',
        url: '/',
      },
      {
        title: 'Bedroom',
        url: 'https://example.com',
      },
      {
        title: 'Bed Linen',
        url: 'https://example.com',
      },
    ],
  },
} satisfies Story;
