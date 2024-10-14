import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  argTypes: {
    image: {
      control: false,
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    halo: false,
    // image: (
    //   <img
    //     alt='User Avatar'
    //     src='https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
    //   />
    // ),
    initials: {
      firstName: 'John',
      lastName: 'Doe',
    },
    size: 'md',
  },
} satisfies Story;
