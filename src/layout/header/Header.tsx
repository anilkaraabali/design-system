import { MenuDrawerAsync } from '@/components/menu';
import { Button } from '@/design-system/button';
import { Container } from '@/design-system/container';
import { IconMenu, IconTimes } from '@/design-system/icons';
import { Logo } from '@/design-system/logo';
import clsx from 'clsx';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';
import { HeaderButtonGroup } from './HeaderButtonGroup';
import { HeaderActionType } from './types';

interface HeaderProps extends React.ComponentPropsWithRef<'header'> {}

export const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const [isSticky, setIsSticky] = useState(false);
  const [action, setAction] = useState<HeaderActionType>(null);

  const drawerCloseRef = useRef<Function | null>(null);

  const Modal = useCallback(() => {
    switch (action) {
      case 'menu':
        return (
          <MenuDrawerAsync
            bindClose={(close) => {
              drawerCloseRef.current = close;
            }}
            onClose={() => setAction(null)}
          />
        );
      default:
        return null;
    }
  }, [action]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id='header'
        ref={ref}
        {...props}
        className={clsx(styles['header'], {
          [styles['header--sticky']]: isSticky,
        })}
      >
        <Container className={styles['header__content']} fluid>
          <div className={styles['header__left']}>
            <Button
              className={styles['header__menu']}
              icon={{
                component: action === 'menu' ? IconTimes : IconMenu,
                position: 'prefix',
              }}
              onClick={() => {
                if (action === 'menu') {
                  drawerCloseRef.current?.();
                  return;
                }
                setAction('menu');
              }}
              shape='rounded'
              theme='ghost'
            />
            <Logo />
          </div>
          <HeaderButtonGroup setAction={setAction} />
        </Container>
      </header>
      <Modal />
    </>
  );
});
