import { IconProps } from './Icon.interface';

export const IconChevronDown: React.FC<IconProps> = (props) => (
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
      d='M4.64645 8.14645C4.47288 8.32001 4.4536 8.58944 4.58859 8.78431L4.64645 8.85355L11.6464 15.8536C11.82 16.0271 12.0894 16.0464 12.2843 15.9114L12.3536 15.8536L19.3536 8.85355C19.5488 8.65829 19.5488 8.34171 19.3536 8.14645C19.18 7.97288 18.9106 7.9536 18.7157 8.08859L18.6464 8.14645L12 14.793L5.35355 8.14645C5.17999 7.97288 4.91056 7.9536 4.71569 8.08859L4.64645 8.14645Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
