import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  args: {
    label: 'Email',
    labelPosition: 'outside',
    placeholder: 'e.g. username@email.com',
    type: 'email',
  },
  argTypes: {
    labelPosition: {
      control: { type: 'radio' },
      options: ['inside', 'outside'],
    },
  },
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {} satisfies Story;

export const Error = {
  args: {
    errorText: 'Please enter a valid email',
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Hint = {
  args: {
    helperText:
      'Password should be at least 6 characters long and contain 2 numbers',
    label: 'Password',
    placeholder: '********',
    type: 'password',
  },
} satisfies Story;
