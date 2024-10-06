import { IconProps } from './Icon.interface';

export const IconPlus: React.FC<IconProps> = (props) => (
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
      d='M12 4C12.2455 4 12.5 4.20339 12.5 4.5C12.5 4.79661 12.5 11.5 12.5 11.5H19.5C19.7761 11.5 20 11.7239 20 12C20 12.2455 19.7761 12.4919 19.5 12.4919L12.5 12.5V19.5C12.5 19.7761 12.2761 20 12 20C11.7545 20 11.5 19.7761 11.5081 19.5L11.5 12.5H4.5C4.22386 12.5 4 12.2761 4 12C4 11.7545 4.20639 11.5 4.5 11.5081L11.5 11.5V4.5C11.5 4.22386 11.7239 4 12 4Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
