import { Link } from '@/design-system/link';

import styles from './MenuQuickLinks.module.scss';
import { IMenuItem } from './types';

interface MenuQuickLinksProps {
  links: IMenuItem[];
}

export const MenuQuickLinks: React.FC<MenuQuickLinksProps> = ({ links }) => (
  <nav className={styles['menu-quick-links']}>
    <ul className={styles['menu-quick-links__list']}>
      {links.map((link, index) => (
        <li className={styles['menu-quick-links__item']} key={index}>
          <Link href={link.url} size='small' theme='secondary'>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
