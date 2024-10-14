import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected = {
  args: {
    children: 'Label',
    defaultChecked: false,
    disabled: false,
  },
} satisfies Story;

export const Selected = {
  args: {
    children: 'Label',
    defaultChecked: true,
    disabled: false,
  },
} satisfies Story;

export const Error = {
  args: {
    children: 'Label',
    defaultChecked: true,
    disabled: false,
    errorText: 'Error message',
  },
} satisfies Story;
