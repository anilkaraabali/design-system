import type { Args, Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { Button } from '../button';
import { GalleryFullscreen } from './GalleryFullscreen';

const meta: Meta<typeof GalleryFullscreen> = {
  component: GalleryFullscreen,
  title: 'Design-System/Gallery Fullscreen',
};

export default meta;
type Story = StoryObj<typeof meta>;

const GalleryFullscreenWithAction = (args: Args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} theme='secondary'>
        Open gallery
      </Button>
      {isOpen && (
        <GalleryFullscreen {...args} onClose={() => setIsOpen(!isOpen)}>
          {args.children}
        </GalleryFullscreen>
      )}
    </>
  );
};

export const Base = {
  args: {
    children: [
      {
        src: 'https://static.zarahome.net/assets/public/8e70/c436/7eee4f2383cd/0494756ded09/42592013985-a7/42592013985-a7.jpg?ts=1725522054940&w=1106&imformat=chrome',
      },
      {
        src: 'https://static.zarahome.net/assets/public/78b6/4f72/c1ba497ca763/fdcb32986b29/42592013985-p1/42592013985-p1.jpg?ts=1725366454087&w=918&imformat=chrome',
      },
      {
        src: 'https://static.zarahome.net/assets/public/7ee1/bbc8/2db84b90bf98/86502d97ab95/42592013985-a1/42592013985-a1.jpg?ts=1725366436705&w=918&imformat=chrome',
      },
      {
        src: 'https://static.zarahome.net/assets/public/b0d0/52db/71ad4fefacbc/1d6b3a805e0b/42592013985-a2/42592013985-a2.jpg?ts=1725366437128&w=918&imformat=chrome',
      },
    ].map((image, index) => (
      <img
        alt=''
        key={index}
        src={image.src}
        style={{
          maxHeight: '100vh',
          width: 'auto',
        }}
      />
    )),
    initialIndex: 0,
    preventOverlayClose: false,
    renderAllItemsOnLoad: true,
    withArrowNavigation: true,
    withDotIndicators: false,
    withDrag: false,
    withKeyboardNavigation: true,
  },
  render: (args) => <GalleryFullscreenWithAction {...args} />,
} satisfies Story;
