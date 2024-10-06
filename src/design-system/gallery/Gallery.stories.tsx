import type { Meta, StoryObj } from '@storybook/react';

import { Gallery } from './Gallery';

const meta: Meta<typeof Gallery> = {
  component: Gallery,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
  args: {
    children: [
      {
        alt: '',
        src: 'https://static.zarahome.net/assets/public/b2b7/eec1/9c744006b730/cbe73158973f/44596013409-a7/44596013409-a7.jpg?ts=1723562922607',
        url: 'https://example.com',
      },
      {
        alt: '',
        src: 'https://static.zarahome.net/assets/public/0e7a/006f/fd7d4771b671/dedfa891424d/44596013409-p1/44596013409-p1.jpg?ts=1723632135549',
        url: 'https://example.com',
      },
      {
        alt: '',
        src: 'https://static.zarahome.net/assets/public/4c3d/1ab9/805a45769e10/b9b965e123e9/44596013409-a3/44596013409-a3.jpg?ts=1723632129979',
        url: 'https://example.com',
      },
      {
        alt: '',
        src: 'https://static.zarahome.net/assets/public/3cc6/09d9/25944f4686f5/fcecc72f8aa5/44596013409-a1/44596013409-a1.jpg?ts=1723632129275',
        url: 'https://example.com',
      },
    ].map((image, index) => (
      <a
        href={image.url}
        key={index}
        style={{
          display: 'block',
          height: '100%',
          width: '100%',
        }}
      >
        <img
          alt={image.alt}
          src={image.src}
          style={{
            height: '100%',
            inset: 0,
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
          }}
        />
      </a>
    )),
    initialIndex: 0,
    renderAllItemsOnLoad: true,
    style: { width: 388 },
    withArrowNavigation: true,
    withDotIndicators: true,
    withDrag: false,
    withKeyboardNavigation: true,
  },
} satisfies Story;
