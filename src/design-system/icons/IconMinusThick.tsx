import { IconProps } from './Icon.interface';

export const IconMinusThick: React.FC<IconProps> = (props) => (
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
      d='M20 11C20.5523 11 21 11.4477 21 12C21 12.5128 20.6571 13 20 12.9933L4 13C3.44772 13 3 12.5523 3 12C3 11.4872 3.47653 11 4 11.0067L20 11Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
