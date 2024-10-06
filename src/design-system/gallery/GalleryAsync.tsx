import dynamic from 'next/dynamic';

import { GalleryProps } from './Gallery';

export const GalleryAsync = dynamic<GalleryProps>(
  () => import('./Gallery').then((mod) => mod.Gallery),
  { ssr: true }
);
