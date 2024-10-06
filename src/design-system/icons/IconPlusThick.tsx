import { IconProps } from './Icon.interface';

export const IconPlusThick: React.FC<IconProps> = (props) => (
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
      d='M12 3C12.5128 3 13 3.50685 12.9933 4L13 11H20C20.5523 11 21 11.4477 21 12C21 12.5128 20.6571 13 20 12.9933L13 13V20C13 20.5523 12.5523 21 12 21C11.4872 21 11 20.5523 11.0067 20L11 13H4C3.44772 13 3 12.5523 3 12C3 11.4872 3.50266 11.0645 4 11.0067L11 11V4C11 3.44772 11.4477 3 12 3Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
