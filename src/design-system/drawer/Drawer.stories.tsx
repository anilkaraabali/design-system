import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../button';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  argTypes: {
    children: { control: { type: 'text' } },
    documentBodyClassName: { control: false },
    header: { control: { type: 'text' } },
    openingDirection: {
      control: { options: ['down', 'left', 'right', 'up'], type: 'radio' },
    },
  },
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} theme='secondary'>
        Open drawer
      </Button>
      {isOpen && (
        <Drawer
          openOnLoad
          {...args}
          onClose={() => setIsOpen(!isOpen)}
          onCloseButtonClick={() => setIsOpen(!isOpen)}
          onOverlayClick={() => setIsOpen(!isOpen)}
          primaryAction={{
            children: 'Primary action',
          }}
          secondaryAction={{
            children: 'Secondary action',
          }}
        />
      )}
    </>
  );
};

export const Base = {
  args: {
    children: <p>Content</p>,
    fillEmptySpace: false,
    header: <>Title</>,
    openingDirection: 'right',
    showCloseButton: true,
  },
  render: (args) => <DrawerWithAction {...args} />,
} satisfies Story;
