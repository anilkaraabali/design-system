import { GalleryBrowseEnum } from '../GalleryBrowse.enum';

export const getBrowseOnUserTouchDown = (
  touchPositionX: number,
  galleryMiddleX: number
): GalleryBrowseEnum => {
  if (galleryMiddleX > touchPositionX) {
    return GalleryBrowseEnum.PREVIOUS;
  }

  return GalleryBrowseEnum.NEXT;
};
