import clsx from 'clsx';
import React from 'react';

import styles from './Rating.module.scss';
import { RatingIcon } from './RatingIcon';

const RATING_DEFAULT_MAX_VALUE = 5;

export interface RatingProps {
  containerClassName?: string;
  maxValue?: number;
  value: number;
}

export const Rating: React.FC<RatingProps> = ({
  containerClassName,
  maxValue = RATING_DEFAULT_MAX_VALUE,
  value,
}) => {
  const items = new Array(Math.ceil(maxValue)).fill(1).map((_, index) => {
    const currentIconIndex = index + 1;
    const diff = currentIconIndex % value;

    if (diff > 0 && diff < 1) {
      return (
        <RatingIcon
          className={styles['rating_icon']}
          key={index.toString()}
          width={100 - Math.round((currentIconIndex % value) * 100)}
        />
      );
    }

    if (currentIconIndex <= value) {
      return (
        <RatingIcon
          className={styles['rating_icon']}
          key={index.toString()}
          width={100}
        />
      );
    }

    return (
      <RatingIcon
        className={styles['rating_icon']}
        key={index.toString()}
        width={0}
      />
    );
  });

  return (
    <div className={clsx(styles['rating'], containerClassName)}>
      {items}

      {/* Accessibility text*/}
      <div hidden>
        {value} out of {maxValue} rating
      </div>
    </div>
  );
};
