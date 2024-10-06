import { IconProps } from './Icon.interface';

export const IconChevronLeft: React.FC<IconProps> = (props) => (
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
      d='M15.8536 4.64645C15.68 4.47288 15.4106 4.4536 15.2157 4.58859L15.1464 4.64645L8.14645 11.6464C7.97288 11.82 7.9536 12.0894 8.08859 12.2843L8.14645 12.3536L15.1464 19.3536C15.3417 19.5488 15.6583 19.5488 15.8536 19.3536C16.0271 19.18 16.0464 18.9106 15.9114 18.7157L15.8536 18.6464L9.20704 12L15.8536 5.35355C16.0271 5.17999 16.0464 4.91056 15.9114 4.71569L15.8536 4.64645Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
