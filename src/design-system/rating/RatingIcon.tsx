import clsx from 'clsx';
import React from 'react';

import { IconStarFilled } from '../icons';
import styles from './Rating.module.scss';

interface RatingIconProps {
  className?: string;
  width: number;
}

export const RatingIcon: React.FC<RatingIconProps> = ({ className, width }) => (
  <span aria-hidden='true' className={clsx(styles['rating__icon'], className)}>
    <span className={styles['rating__icon-empty-container']}>
      <IconStarFilled
        className={styles['rating__icon-empty']}
        height='19'
        viewBox='2 2 20 19'
        width='20'
      />
    </span>
    {width > 0 ? (
      <span
        className={styles['rating__icon-filled-container']}
        style={{ width: `${width}%` }}
      >
        <IconStarFilled
          className={styles['rating__icon-filled']}
          height='19'
          viewBox='2 2 20 19'
          width='20'
        />
      </span>
    ) : null}
  </span>
);
