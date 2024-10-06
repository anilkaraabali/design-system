import type { Meta, StoryObj } from '@storybook/react';

import { IconTimes } from '../icons';
import { Link as LinkComponent } from './Link';

const meta: Meta<typeof LinkComponent> = {
  args: {
    href: 'https://example.com',
    shape: 'default',
    size: 'default',
    theme: 'primary',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    shape: {
      control: { type: 'radio' },
      options: ['default', 'rounded'],
    },
    size: {
      control: { type: 'radio' },
      options: ['xsmall', 'small', 'default'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link'],
    },
  },
  component: LinkComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
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
