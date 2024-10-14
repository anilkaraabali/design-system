import type { Meta, StoryObj } from '@storybook/react';

import { NavigationArrows } from './NavigationArrows';

const meta: Meta<typeof NavigationArrows> = {
  component: NavigationArrows,
  title: 'Design-System/Navigation Arrows',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    as: 'div',
    nextProps: {
      disabled: false,
    },
    prevProps: {
      disabled: false,
    },
  },
} satisfies Story;
