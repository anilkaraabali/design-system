import clsx from 'clsx';
import React, { forwardRef, useCallback } from 'react';

import {
  IconCheckmarkCircleFilled,
  IconInfoCircleFilled,
  IconTimes,
  IconTimesCircleFilled,
  IconWarningTriangleFilled,
} from '../icons';
import styles from './Banner.module.scss';

export interface BannerProps extends React.ComponentPropsWithRef<'div'> {
  onCloseButtonClick: () => void;
  status: 'critical' | 'info' | 'success' | 'warning';
  text: string;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ onCloseButtonClick, status, text, ...rest }, ref) => {
    const Icon = useCallback(() => {
      switch (status) {
        case 'success':
          return <IconCheckmarkCircleFilled />;
        case 'critical':
          return <IconTimesCircleFilled />;
        case 'warning':
          return <IconWarningTriangleFilled />;
        case 'info':
          return <IconInfoCircleFilled />;
      }
    }, [status]);

    return (
      <div
        ref={ref}
        {...rest}
        className={clsx(
          styles['banner'],
          styles[`banner-status--${status}`],
          rest.className
        )}
      >
        <div className={styles['banner__content']}>
          <div className={styles['banner__icon']}>
            <Icon />
          </div>
          <p className={styles['banner__text']}>{text}</p>
        </div>
        <button
          className={styles['banner__button']}
          onClick={onCloseButtonClick}
          type='button'
        >
          <IconTimes />
        </button>
      </div>
    );
  }
);
