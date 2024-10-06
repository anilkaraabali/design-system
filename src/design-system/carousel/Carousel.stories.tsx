import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Carousel } from './Carousel';
import styles from './Carousel.stories.module.scss';
import { useCarousel } from './hook';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof meta>;

const images = [
  {
    alt: 'Placeholder 1',
    src: 'https://static.zarahome.net/assets/public/b2b7/eec1/9c744006b730/cbe73158973f/44596013409-a7/44596013409-a7.jpg?ts=1723562922607',
  },
  {
    alt: 'Placeholder 2',
    src: 'https://static.zarahome.net/assets/public/0e7a/006f/fd7d4771b671/dedfa891424d/44596013409-p1/44596013409-p1.jpg?ts=1723632135549',
  },
  {
    alt: 'Placeholder 3',
    src: 'https://static.zarahome.net/assets/public/4c3d/1ab9/805a45769e10/b9b965e123e9/44596013409-a3/44596013409-a3.jpg?ts=1723632129979',
  },
  {
    alt: 'Placeholder 4',
    src: 'https://static.zarahome.net/assets/public/3cc6/09d9/25944f4686f5/fcecc72f8aa5/44596013409-a1/44596013409-a1.jpg?ts=1723632129275',
  },
];

const CarouselWithArrows = (args: Args) => {
  const { Carousel, CarouselNavigationArrows } = useCarousel();

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <p>Bestseller</p>
          <CarouselNavigationArrows
            nextProps={{
              disabled: activeIndex === images.length - 1,
            }}
            prevProps={{
              disabled: activeIndex === 0,
            }}
          />
        </div>
        <Carousel
          portionsBySize={args.portionsBySize}
          {...args}
          onCardChangeEnd={(index): void => {
            setActiveIndex(index);
          }}
          onCardChangeStart={(): void => {}}
        >
          {images.map((image, index) => (
            <a
              className={styles['card']}
              href='https://example.com/'
              key={index}
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export const Base = {
  args: {
    gap: 8,
    portionsBySize: { 'extra-large': 6, large: 3, medium: 2, small: 1 },
    resizeOnHover: false,
  },
  render: (args) => <CarouselWithArrows {...args} />,
} satisfies Story;
