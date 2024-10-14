import { Button } from '@/design-system/button';
import {
  IconHeart,
  IconMagnifier,
  IconShoppingBag,
  IconUser,
} from '@/design-system/icons';
import { Link } from '@/design-system/link';

import styles from './HeaderButtonGroup.module.scss';
import { HeaderActionType } from './types';

interface HeaderButtonGroupProps {
  setAction: (action: HeaderActionType) => void;
}

export const HeaderButtonGroup: React.FC<HeaderButtonGroupProps> = ({
  setAction,
}) => (
  <div className={styles['header-button-group']}>
    <Button
      icon={{
        component: IconMagnifier,
        position: 'prefix',
      }}
      onClick={() => setAction('search')}
      size='small'
    />
    <Button
      icon={{
        component: IconUser,
        position: 'prefix',
      }}
      onClick={() => setAction('auth')}
      size='small'
    />
    <Link
      href='/wishlist'
      icon={{
        component: IconHeart,
        position: 'prefix',
      }}
      size='small'
    />
    <Link
      href='/cart'
      icon={{
        component: IconShoppingBag,
        position: 'prefix',
      }}
      size='small'
    />
  </div>
);
