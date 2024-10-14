import type { Meta, StoryObj } from '@storybook/react';

import { IconTimes } from '../icons';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  args: {
    disabled: false,
    loading: false,
    size: 'regular',
    theme: 'primary',
    type: 'button',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'regular'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link', 'none'],
    },
  },
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelOnly = {
  args: {
    children: 'Label',
  },
} satisfies Story;

export const LabelWithPrefix = {
  args: {
    children: 'Label',
    icon: {
      component: IconTimes,
      position: 'prefix',
    },
  },
} satisfies Story;

export const LabelWithSuffix = {
  args: {
    children: 'Label',
    icon: {
      component: IconTimes,
      position: 'suffix',
    },
  },
} satisfies Story;
