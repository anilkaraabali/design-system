import type { Meta, StoryObj } from '@storybook/react';

import { Indicator } from './Indicator';
import styles from './Indicator.stories.module.scss';

const meta: Meta<typeof Indicator> = {
  component: Indicator,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    activeIndex: 0,
    dotClassName: styles['indicator__dot'],
    itemsCount: 5,
    itemWidth: 10,
    numberOfIndicators: 7,
  },
} satisfies Story;
