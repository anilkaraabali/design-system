import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  args: {
    disabled: false,
    errorText: '',
    helperText: '',
    label: 'Your comment',
    labelPosition: 'outside',
    placeholder: 'Enter your comment here....',
  },
  argTypes: {
    labelPosition: {
      control: { type: 'radio' },
      options: ['inside', 'outside'],
    },
  },
  component: Textarea,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 375 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Base = {} satisfies Story;

export const Error = {
  args: {
    errorText: 'Please don’t include any private information here.',
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;

export const Hint = {
  args: {
    helperText: "Please don't include any private information here.",
  },
} satisfies Story;
