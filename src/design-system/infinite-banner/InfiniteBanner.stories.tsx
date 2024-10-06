import type { Meta, StoryObj } from '@storybook/react';

import { InfiniteBanner } from './InfiniteBanner';

const meta: Meta<typeof InfiniteBanner> = {
  component: InfiniteBanner,
  title: 'Design System/Infinite Banner',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: <h2>Kostenloser Standardversand ab 25€** .</h2>,
    count: 3,
  },
} satisfies Story;
