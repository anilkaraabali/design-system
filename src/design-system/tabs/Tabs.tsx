import clsx from 'clsx';
import React, {
  forwardRef,
  FunctionComponent,
  useCallback,
  useState,
} from 'react';

import styles from './Tabs.module.scss';

const TAB_ID_PREFIX = 'tab';

export interface ITabsItem {
  content: React.ReactNode | string;
  contentClassName?: string;
  title: React.ReactNode | string;
  titleClassName?: string;
}

export interface TabsProps extends React.ComponentPropsWithRef<'section'> {
  activeTabIndex?: number;
  items: ITabsItem[];
  navigationClassName?: string;
  onTabChange?: (index: number) => void;
  preserveAllContent?: boolean;
}

export const Tabs = forwardRef<HTMLElement, TabsProps>(
  (
    {
      activeTabIndex = 0,
      items,
      navigationClassName,
      onTabChange,
      preserveAllContent = false,
      ...rest
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(activeTabIndex);

    if (!items || items.length === 0) {
      return null;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Content = useCallback<FunctionComponent>(() => {
      if (preserveAllContent) {
        return (
          <>
            {items.map((item, index) => (
              <div
                aria-labelledby={`${TAB_ID_PREFIX}${index + 1}`}
                className={clsx(
                  styles['tabs__content'],
                  item.contentClassName,
                  {
                    [styles['tabs__content--hidden']]: index !== currentIndex,
                  }
                )}
                id={`${TAB_ID_PREFIX}${index + 1}`}
                key={`item-content-${index}`}
                role={'tabpanel'}
                tabIndex={0}
              >
                {item.content}
              </div>
            ))}
          </>
        );
      }

      return (
        <div
          aria-labelledby={`${TAB_ID_PREFIX}${currentIndex + 1}`}
          className={clsx(
            styles['tabs__content'],
            items[currentIndex].contentClassName
          )}
          id={`${TAB_ID_PREFIX}${currentIndex + 1}`}
          role={'tabpanel'}
          tabIndex={0}
        >
          {items[currentIndex].content}
        </div>
      );
    }, [preserveAllContent, items, currentIndex]);

    return (
      <section ref={ref} role='tabpanel' {...rest}>
        <div
          className={clsx(styles['tabs__navigation'], navigationClassName)}
          role='tablist'
        >
          {items.map(({ title, titleClassName }, index) => (
            <button
              aria-controls={`${TAB_ID_PREFIX}${index + 1}`}
              aria-selected={currentIndex === index}
              className={clsx(styles['tabs__navigation-item'], titleClassName, {
                [styles['tabs__navigation-item--active']]:
                  currentIndex === index,
              })}
              key={index}
              onClick={(): void => {
                onTabChange?.(index);
                setCurrentIndex(index);
              }}
              role='tab'
            >
              {title}
            </button>
          ))}
        </div>
        {currentIndex >= 0 && currentIndex < items.length && <Content />}
      </section>
    );
  }
);
