import { IconProps } from './Icon.interface';

export const IconMenu: React.FC<IconProps> = (props) => (
  <svg
    fill='none'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      clipRule='evenodd'
      d='M3.5 7.5C3.5 7.22386 3.72386 7 4 7H20C20.2761 7 20.5 7.22386 20.5 7.5C20.5 7.77614 20.2761 8 20 8H4C3.72386 8 3.5 7.77614 3.5 7.5ZM3.5 12.5C3.5 12.2239 3.72386 12 4 12H20C20.2761 12 20.5 12.2239 20.5 12.5C20.5 12.7761 20.2761 13 20 13H4C3.72386 13 3.5 12.7761 3.5 12.5ZM3.5 17.5C3.5 17.2239 3.72386 17 4 17H20C20.2761 17 20.5 17.2239 20.5 17.5C20.5 17.7761 20.2761 18 20 18H4C3.72386 18 3.5 17.7761 3.5 17.5Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
