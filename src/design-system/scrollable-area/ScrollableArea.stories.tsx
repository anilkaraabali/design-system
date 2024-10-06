import type { Args, Meta, StoryObj } from '@storybook/react';

import { list } from 'radash';

import { ScrollableArea } from './ScrollableArea';
import { useScrollableArea } from './ScrollableArea.hook';
import styles from './ScrollableArea.stories.module.scss';

const meta: Meta<typeof ScrollableArea> = {
  component: ScrollableArea,
  title: 'Design-System/Scrollable Area',
};

export default meta;
type Story = StoryObj<typeof meta>;

const ScrollableAreaWithHook = (args: Args) => {
  const { ScrollableArea: ScrollableAreaComponent, ScrollableAreaArrows } =
    useScrollableArea();

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <p>Items</p>
          <ScrollableAreaArrows />
        </div>
        <ScrollableAreaComponent wrapperClassName={styles['wrapper']} {...args}>
          {list(3).map((_, index) => (
            <div className={styles['item']} key={index}>
              {index + 1}
            </div>
          ))}
        </ScrollableAreaComponent>
      </div>
    </>
  );
};

export const Base = {
  args: {
    initialJumpToItemIndex: 0,
  },
  render: (args) => <ScrollableAreaWithHook {...args} />,
} satisfies Story;
