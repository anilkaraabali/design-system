import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { IconMagnifierThick, IconTimesSmall } from '../icons';
import styles from './SearchField.module.scss';

interface SearchFieldProps extends React.ComponentPropsWithRef<'input'> {
  contentLeft?: JSX.Element;
  contentRight?: JSX.Element;
  theme?: 'alternative' | 'default';
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    { contentLeft, contentRight, disabled, theme = 'default', value, ...rest },
    ref
  ) => (
    <div
      className={clsx(
        styles['search-field'],
        styles[`search-field--theme-${theme}`],
        {
          [styles['search-field--disabled']]: disabled,
        }
      )}
    >
      {contentLeft ?? (
        <IconMagnifierThick className={styles['search-field__icon']} />
      )}
      <input
        ref={ref}
        {...rest}
        className={styles['search-field__input']}
        value={value}
      />
      {(contentRight ?? value) ? <IconTimesSmall /> : null}
    </div>
  )
);
