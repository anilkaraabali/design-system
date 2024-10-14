import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  argTypes: {
    checked: { control: false },
    size: {
      control: { type: 'radio' },
      options: ['large', 'regular'],
    },
  },
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof meta>;

const SwitchWithState = (args: Args) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Switch
      {...args}
      checked={isChecked}
      onClick={() => setIsChecked(!isChecked)}
    />
  );
};

export const Base = {
  args: {
    children: 'Airplane mode',
    id: 'mode',
    size: 'regular',
  },
  render: (args) => <SwitchWithState {...args} />,
} satisfies Story;
