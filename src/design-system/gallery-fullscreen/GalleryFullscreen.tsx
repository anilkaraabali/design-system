import { OnFullScreenProps, useOnFullScreen } from '@/hooks';
import React, { useRef, useState } from 'react';

import { Button } from '../button';
import { Gallery, GalleryProps } from '../gallery/Gallery';
import { IconTimesThick } from '../icons';
import { Overlay } from '../overlay';
import { Portal } from '../portal';
import styles from './GalleryFullscreen.module.scss';

export interface GalleryFullscreenProps
  extends Omit<
      GalleryProps,
      | 'numberOfIndicators'
      | 'withArrowNavigation'
      | 'withDotIndicator'
      | 'withDrag'
      | 'withKeyboardNavigation'
    >,
    Pick<OnFullScreenProps, 'onClose' | 'onESCKeyDown' | 'onOpen'> {
  onCloseButtonClick?: () => void;
  onOverlayClick?: () => void;
  preventOverlayClose?: boolean;
}

export const GalleryFullscreen: React.FC<GalleryFullscreenProps> = ({
  children,
  onActiveIndexChange,
  onClose,
  onCloseButtonClick,
  onOpen,
  onOverlayClick,
  preventOverlayClose = true,
  ...rest
}) => {
  const { open, setOpen } = useOnFullScreen({
    documentBodyClassName: 'gallery-fullscreen-block-overflow',
    onClose,
    onOpen,
    openOnLoad: true,
  });

  const [activeIndex, setActiveIndex] = useState(rest.initialIndex || 0);

  const goToRef = useRef<Function | null>(null);

  if (!open) {
    return null;
  }

  return (
    <Portal rootId='gallery-fullscreen-block-overflow'>
      <div className={styles['gallery-full-screen']}>
        <Overlay
          className={styles['gallery-full-screen__overlay']}
          onClick={(): void => {
            if (!preventOverlayClose) {
              setOpen(false);
              onOverlayClick?.();
            }
          }}
        />
        <Button
          className={styles['gallery-full-screen__close-button']}
          icon={{
            component: IconTimesThick,
            position: 'prefix',
          }}
          onClick={() => {
            setOpen(false);
            onCloseButtonClick?.();
          }}
        />
        <Gallery
          className={styles['gallery-full-screen__inner-gallery']}
          {...rest}
          bindGoTo={(goTo): void => {
            goToRef.current = goTo;
          }}
          initialIndex={activeIndex}
          itemClassName={styles['gallery-full-screen__item']}
          navigationArrowsProps={{
            nextProps: {
              className: styles['gallery-full-screen__arrow-next'],
              size: 'default',
            },
            prevProps: {
              className: styles['gallery-full-screen__arrow-prev'],
              size: 'default',
            },
          }}
          onActiveIndexChange={(index, length): void => {
            onActiveIndexChange?.(index, length);
            setActiveIndex(index);
          }}
          withDotIndicators={false}
        >
          {children}
        </Gallery>
      </div>
    </Portal>
  );
};
