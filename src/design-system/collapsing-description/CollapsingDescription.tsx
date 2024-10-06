import clsx from 'clsx';
import { forwardRef, useCallback, useState } from 'react';

import { Button } from '../button';
import { IconChevronDown, IconChevronUp } from '../icons';
import { SanitizeHtmlAsync } from '../sanitize-html';
import styles from './CollapsingDescription.module.scss';

const MAX_HEIGHT = 124;

interface CollapsingDescriptionProps
  extends React.ComponentPropsWithRef<'div'> {
  maxHeight?: number;
  text: string;
}

export const CollapsingDescription = forwardRef<
  HTMLDivElement,
  CollapsingDescriptionProps
>(({ maxHeight = MAX_HEIGHT, text, ...rest }, ref) => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const contentRef = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setScrollHeight(node.scrollHeight);
      }
    },
    [expanded]
  );

  return (
    <div
      ref={ref}
      {...rest}
      className={clsx(styles['collapsing-description'], rest.className)}
    >
      <div
        className={clsx(styles['collapsing-description__content'], {
          [styles['collapsing-description__content--trim']]:
            !expanded && scrollHeight > maxHeight,
        })}
        ref={contentRef}
        style={
          {
            '--collapsing-description-max-height': maxHeight,
            maxHeight: expanded ? scrollHeight : maxHeight,
          } as React.CSSProperties
        }
      >
        <SanitizeHtmlAsync text={text} />
      </div>
      {scrollHeight > maxHeight ? (
        <Button
          className={styles['collapsing-description__button']}
          icon={{
            component: expanded ? IconChevronUp : IconChevronDown,
            position: 'suffix',
          }}
          onClick={(): void => {
            setExpanded(!expanded);
          }}
          size='small'
        />
      ) : null}
    </div>
  );
});
