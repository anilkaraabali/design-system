import type { Meta, StoryObj } from '@storybook/react';

import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  args: {
    placeholder: 'Search...',
    theme: 'default',
  },
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['default', 'alternative'],
    },
  },
  component: SearchField,
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

export const Base = {
  args: {},
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
  },
} satisfies Story;
