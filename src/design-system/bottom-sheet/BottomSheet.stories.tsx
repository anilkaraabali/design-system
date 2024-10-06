import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { BottomSheet } from '../bottom-sheet';
import { Button } from '../button';

const meta: Meta<typeof BottomSheet> = {
  argTypes: {
    actionOrientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
    documentBodyClassName: {
      control: false,
    },
    openOnLoad: {
      control: false,
    },
  },
  component: BottomSheet,
  title: 'Design-System/Bottom Sheet',
};

export default meta;
type Story = StoryObj<typeof meta>;

const BottomSheetWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} theme='secondary'>
        Open bottom sheet
      </Button>
      {isOpen && (
        <BottomSheet {...args} onClose={() => setIsOpen(false)} openOnLoad />
      )}
    </>
  );
};

export const Base = {
  args: {
    actionOrientation: 'horizontal',
    children: 'Content',
    heading: 'Title',
    primaryAction: {
      content: 'Primary action',
      props: {},
    },
    secondaryAction: {
      content: 'Secondary action',
      props: {},
    },
    showFooter: true,
    showHeader: true,
    showOverlay: true,
  },
  render: (args) => <BottomSheetWithAction {...args} />,
} satisfies Story;
