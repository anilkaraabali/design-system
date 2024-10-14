import { IconProps } from './Icon.interface';

export const IconCheckmarkThick: React.FC<IconProps> = (props) => (
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
      d='M14.7803 0.219658C15.0732 0.512545 15.0732 0.987419 14.7803 1.28032L5.78034 10.2807C5.63969 10.4214 5.44891 10.5004 5.24999 10.5004C5.05107 10.5004 4.8603 10.4214 4.71965 10.2807L0.219646 5.78031C-0.0732338 5.4874 -0.0732128 5.01253 0.219693 4.71965C0.5126 4.42677 0.987473 4.42679 1.28035 4.71969L5.25001 8.6897L13.7197 0.219682C14.0125 -0.073218 14.4874 -0.0732285 14.7803 0.219658Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
