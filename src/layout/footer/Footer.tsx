import { Container } from '@/design-system/container/Container';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import styles from './Footer.module.scss';

interface FooterProps extends React.ComponentPropsWithRef<'footer'> {}

export const Footer = forwardRef<HTMLElement, FooterProps>((props, ref) => (
  <footer
    id='footer'
    {...props}
    className={clsx(
      styles['footer'],

      props.className
    )}
    ref={ref}
  >
    <Container className={styles['footer__content']}>Footer content</Container>
  </footer>
));
