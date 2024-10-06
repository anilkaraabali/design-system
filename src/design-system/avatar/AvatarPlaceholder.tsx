import React, { forwardRef } from 'react';

interface AvatarPlaceholderProps extends React.ComponentPropsWithRef<'svg'> {}

export const AvatarPlaceholder = forwardRef<
  SVGSVGElement,
  AvatarPlaceholderProps
>((props, ref) => (
  <svg
    fill='none'
    ref={ref}
    viewBox='0 0 32 32'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g clipPath='url(#clip0_567_1511)'>
      <circle cx='16' cy='16' fill='#E3E3E3' r='16' />
      <path
        clipRule='evenodd'
        d='M28.0099 26.5721C25.0779 29.9003 20.7841 32 16 32C11.2158 32 6.92212 29.9003 3.9901 26.5721C6.11974 24.07 10.697 22.3396 16 22.3396C21.303 22.3396 25.8803 24.07 28.0099 26.5721ZM22.0377 13.1321C22.0377 17.3836 19.3345 20.8302 16 20.8302C12.6655 20.8302 9.96226 17.3836 9.96226 13.1321C9.96226 8.88053 12.6655 5.43396 16 5.43396C19.3345 5.43396 22.0377 8.88053 22.0377 13.1321Z'
        fill='#B0B0B0'
        fillRule='evenodd'
      />
    </g>
    <defs>
      <clipPath id='clip0_567_1511'>
        <rect fill='#fff' height='32' width='32' />
      </clipPath>
    </defs>
  </svg>
));
