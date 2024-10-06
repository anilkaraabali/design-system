import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../button';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} theme='secondary'>
        Open dialog
      </Button>
      {isOpen && (
        <Dialog
          {...args}
          closeDialog={(): void => setIsOpen(false)}
          content={args.content}
          isOpen={isOpen}
          primaryAction={args.primaryAction}
        />
      )}
    </>
  );
};

export const Base = {
  args: {
    content:
      'Are you sure to end this conversation? All the chat history will be lost if you end the conversation.',
    disableEscapeKeyDown: false,
    primaryAction: {
      label: 'Yes',
    },
    secondaryAction: {
      label: 'No',
    },
  },
  render: (args) => <DialogWithAction {...args} />,
} satisfies Story;
