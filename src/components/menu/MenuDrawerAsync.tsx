import dynamic from 'next/dynamic';

export const MenuDrawerAsync = dynamic(
  () => import('./MenuDrawer').then((mod) => mod.MenuDrawer),
  { ssr: false }
);
