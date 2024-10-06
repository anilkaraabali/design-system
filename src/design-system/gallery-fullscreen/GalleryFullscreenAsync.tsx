import dynamic from 'next/dynamic';

export const GalleryFullscreenAsync = dynamic(
  () => import('./GalleryFullscreen').then((mod) => mod.GalleryFullscreen),
  { ssr: false }
);
