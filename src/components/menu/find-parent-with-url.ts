import menu from 'public/data/nav.json';

import { IMenuItem } from './types';

const findParentWithUrl = (
  menu: IMenuItem[],
  url: string
): IMenuItem | null => {
  for (const item of menu) {
    if (item.url === url) {
      return item;
    }

    if (item.children && item.children.length > 0) {
      const found = findParentWithUrl(item.children, url);
      if (found) {
        return item;
      }
    }
  }

  return null;
};

export const getMenuChildrenOfParent = (slug: string): IMenuItem[] => {
  const url = `/collections/${slug}`;
  const parent = findParentWithUrl(menu, url);

  if (parent) {
    return (parent.children || []).filter((child) => child.url !== url);
  }

  return [];
};
