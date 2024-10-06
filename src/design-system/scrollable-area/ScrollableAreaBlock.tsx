import clsx from 'clsx';

import { Container } from '../container';
import { useScrollableArea } from './ScrollableArea.hook';
import styles from './ScrollableAreaBlock.module.scss';

interface ScrollableAreaBlockProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  title: React.ReactElement | string;
}

export const ScrollableAreaBlock: React.FC<ScrollableAreaBlockProps> = ({
  as: Element = 'section',
  children,
  className,
  title,
}) => {
  const { ScrollableArea, ScrollableAreaArrows } = useScrollableArea();

  return (
    <Element className={clsx(styles['scrollable-area-block'], className)}>
      <Container className={styles['scrollable-area-block__content']} fluid>
        <div className={styles['scrollable-area-block__header']}>
          <div className={styles['scrollable-area-block__heading']}>
            {typeof title === 'string' ? (
              <h2 className={styles['scrollable-area-block__title']}>
                {title}
              </h2>
            ) : (
              title
            )}
          </div>
          <ScrollableAreaArrows
            className={styles['scrollable-area-block__cta']}
          />
        </div>
        <ScrollableArea itemClassName={styles['scrollable-area-block__item']}>
          {children}
        </ScrollableArea>
      </Container>
    </Element>
  );
};
