import type { Meta, StoryObj } from '@storybook/react';

import { IconTimes } from '../icons';
import { Link as LinkComponent } from './Link';

const meta: Meta<typeof LinkComponent> = {
  args: {
    href: 'https://example.com',
    size: 'regular',
    theme: 'primary',
  },
  argTypes: {
    children: {
      control: 'text',
    },
    size: {
      control: { type: 'radio' },
      options: ['regular', 'small'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'link', 'none'],
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
