import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Overlay.module.scss';

export interface OverlayProps extends React.ComponentPropsWithRef<'button'> {}

export const Overlay = forwardRef<HTMLButtonElement, OverlayProps>(
  (props, ref) => (
    <button
      ref={ref}
      type='button'
      {...props}
      className={clsx(styles['overlay'], props.className)}
    />
  )
);
