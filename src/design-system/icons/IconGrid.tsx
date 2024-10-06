import { IconProps } from './Icon.interface';

export const IconGrid: React.FC<IconProps> = (props) => (
  <svg
    fill='none'
    height='24'
    viewBox='0 0 24 24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5Z'
      stroke='currentColor'
    />
    <path
      d='M7 20.5C8.933 20.5 10.5 18.933 10.5 17C10.5 15.067 8.933 13.5 7 13.5C5.067 13.5 3.5 15.067 3.5 17C3.5 18.933 5.067 20.5 7 20.5Z'
      stroke='currentColor'
    />
    <path
      d='M17 10.5C18.933 10.5 20.5 8.933 20.5 7C20.5 5.067 18.933 3.5 17 3.5C15.067 3.5 13.5 5.067 13.5 7C13.5 8.933 15.067 10.5 17 10.5Z'
      stroke='currentColor'
    />
    <path
      d='M17 20.5C18.933 20.5 20.5 18.933 20.5 17C20.5 15.067 18.933 13.5 17 13.5C15.067 13.5 13.5 15.067 13.5 17C13.5 18.933 15.067 20.5 17 20.5Z'
      stroke='currentColor'
    />
  </svg>
);
