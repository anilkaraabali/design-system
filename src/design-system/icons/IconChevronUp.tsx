import { IconProps } from './Icon.interface';

export const IconChevronUp: React.FC<IconProps> = (props) => (
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
      d='M4.64645 15.8536C4.47288 15.68 4.4536 15.4106 4.58859 15.2157L4.64645 15.1464L11.6464 8.14645C11.82 7.97288 12.0894 7.9536 12.2843 8.08859L12.3536 8.14645L19.3536 15.1464C19.5488 15.3417 19.5488 15.6583 19.3536 15.8536C19.18 16.0271 18.9106 16.0464 18.7157 15.9114L18.6464 15.8536L12 9.20704L5.35355 15.8536C5.17999 16.0271 4.91056 16.0464 4.71569 15.9114L4.64645 15.8536Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
