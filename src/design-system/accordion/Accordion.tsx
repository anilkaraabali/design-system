import clsx from 'clsx';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

import { IconChevronDown, IconChevronUp } from '../icons';
import { IconProps } from '../icons/Icon.interface';
import styles from './Accordion.module.scss';

export interface AccordionProps extends React.ComponentPropsWithRef<'div'> {
  disabled?: boolean;
  expanded?: boolean;
  headerClassName?: string;
  icon?: {
    active: React.FC<IconProps>;
    inactive: React.FC<IconProps>;
    props?: IconProps;
  };
  onToggle?: (id?: string) => void;
  theme?: 'default' | 'primary';
  title: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      disabled,
      expanded = false,
      headerClassName,
      icon,
      id,
      onToggle,
      theme = 'primary',
      title,
      ...rest
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(expanded);
    const { active = IconChevronUp, inactive = IconChevronDown } = icon || {};
    const Icon = isExpanded ? active : inactive;

    const toggle = useCallback(() => {
      setIsExpanded((isExpanded) => !isExpanded);
      onToggle?.(id);
    }, []);

    useEffect(() => {
      if (expanded !== isExpanded) {
        setIsExpanded(expanded);
      }
    }, [expanded]);

    return (
      <div
        id={`accordion-${id}`}
        ref={ref}
        {...rest}
        aria-disabled={disabled}
        aria-expanded={isExpanded}
        className={clsx(
          styles['accordion'],
          {
            [styles['accordion--active']]: isExpanded,
            [styles['accordion--disabled']]: disabled,
            [styles[`accordion-theme--${theme}`]]: theme,
          },
          rest.className
        )}
      >
        <button
          className={clsx(styles['accordion__header'], headerClassName)}
          onClick={toggle}
        >
          <p className={styles['accordion__unit__title']}>{title}</p>
          {!disabled && (
            <Icon
              className={clsx(
                styles['accordion__icon'],

                icon?.props?.className
              )}
            />
          )}
        </button>
        <div className={styles['accordion__body']}>
          <div className={styles['accordion__content']}>{children}</div>
        </div>
      </div>
    );
  }
);
