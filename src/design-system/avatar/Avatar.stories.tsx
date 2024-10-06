import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  argTypes: {
    image: {
      control: false,
    },
    size: {
      control: { type: 'radio' },
      options: ['large', 'medium', 'small', 'x-large', 'x-small'],
    },
  },
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    halo: false,
    image: (
      <img
        alt='User Avatar'
        src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
      />
    ),
    initials: {
      firstName: 'John',
      lastName: 'Doe',
    },
    size: 'small',
  },
} satisfies Story;
