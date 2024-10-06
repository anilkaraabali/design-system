import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../button';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
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
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} theme='secondary'>
        Open modal
      </Button>
      {isOpen && (
        <Modal {...args} onClose={() => setIsOpen(false)} openOnLoad />
      )}
    </>
  );
};

export const Base = {
  args: {
    actionOrientation: 'horizontal',
    children: 'Content',
    fullScreen: false,
    modalTitle: 'Title',
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
    tertiaryAction: {
      content: 'Tertiary action',
      props: {},
    },
  },
  render: (args) => <ModalWithAction {...args} />,
} satisfies Story;
