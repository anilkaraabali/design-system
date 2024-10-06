import { Drawer } from '@/design-system/drawer';
import clsx from 'clsx';
import items from 'public/data/nav.json';
import { useState } from 'react';

import styles from './MenuDrawer.module.scss';

interface MenuDrawerProps extends React.ComponentPropsWithoutRef<'div'> {
  bindClose?: (close: () => void) => void;
  onClose: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  bindClose,
  onClose,
}) => {
  const [activeKey, setActiveKey] = useState<null | string>(null);

  const closeDrawer = () => {
    setActiveKey(null);
    onClose();
  };

  return (
    <Drawer
      bindClose={bindClose}
      containerClassName={styles['menu__drawer__container']}
      contentClassName={styles['menu__drawer__content']}
      onClose={onClose}
      openingDirection='right'
      openOnLoad
    >
      <nav className={styles['menu__nav']}>
        <ul className={styles['menu__list']}>
          {items.map((item) => (
            <li className={styles['menu__item']} key={item.key}>
              {item.children.length ? (
                <div
                  className={clsx(styles['menu__accordion'], {
                    [styles['menu__accordion--active']]: activeKey === item.key,
                  })}
                >
                  <button
                    className={clsx(styles['menu__accordion__header'], {
                      [styles['menu__accordion__header--active']]:
                        activeKey === item.key,
                    })}
                    onClick={() =>
                      setActiveKey(activeKey === item.key ? null : item.key)
                    }
                  >
                    {item.label}
                  </button>
                  <div className={styles['menu__accordion__body']}>
                    <div className={styles['menu__accordion__content']}>
                      {item.children.map((child) => (
                        <div
                          className={styles['menu__accordion__item']}
                          key={child.key}
                        >
                          <a
                            className={styles['menu__link']}
                            href={child.url}
                            onClick={closeDrawer}
                          >
                            {child.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  className={clsx(styles['menu__accordion__header'], {
                    [styles['menu__accordion__header--active']]:
                      activeKey === item.key,
                    [styles['menu__accordion__header--sale']]:
                      item.key === 'aktion',
                  })}
                  href={item.url}
                  onClick={closeDrawer}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  );
};
