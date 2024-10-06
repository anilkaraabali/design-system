import type { Meta, StoryObj } from '@storybook/react';

import { IconTimes } from '../icons';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  args: {
    disabled: false,
    loading: false,
    shape: 'default',
    size: 'default',
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
    shape: {
      control: { type: 'radio' },
      options: ['default', 'rounded'],
    },
    size: {
      control: { type: 'radio' },
      options: ['small', 'default'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link'],
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

export const IconOnly = {
  args: {
    icon: {
      component: IconTimes,
      position: 'prefix',
    },
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
