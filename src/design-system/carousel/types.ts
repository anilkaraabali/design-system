type CarouselItemSizeType = 'extra-large' | 'large' | 'medium' | 'small';

type CarouselItemSizeObjectType = {
  [key in CarouselItemSizeType]?: number;
};

export type { CarouselItemSizeObjectType, CarouselItemSizeType };
