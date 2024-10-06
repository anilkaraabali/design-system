import type { Meta, StoryObj } from '@storybook/react';

import { IconMagnifier } from '../icons';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  args: {
    disabled: false,
  },
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelOnly = {
  args: {
    checked: false,
    children: 'Label',
  },
} satisfies Story;

export const LabelWithPrefix = {
  args: {
    checked: false,
    children: 'Label',
    icon: {
      component: IconMagnifier,
      position: 'prefix',
    },
  },
} satisfies Story;

export const LabelWithSuffix = {
  args: {
    checked: false,
    children: 'Label',
    icon: {
      component: IconMagnifier,
      position: 'suffix',
    },
  },
} satisfies Story;
