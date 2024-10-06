import { IconProps } from './Icon.interface';

export const IconCheckmark: React.FC<IconProps> = (props) => (
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
      d='M19.3535 7.14644C19.5488 7.3417 19.5488 7.65828 19.3536 7.85355L10.3536 16.8539C10.2598 16.9477 10.1326 17.0004 9.99999 17.0004C9.86738 17.0004 9.7402 16.9477 9.64643 16.8539L5.14643 12.3535C4.95118 12.1583 4.95119 11.8417 5.14646 11.6464C5.34173 11.4512 5.65832 11.4512 5.85357 11.6465L10 15.7933L18.6464 7.14645C18.8417 6.95119 19.1583 6.95118 19.3535 7.14644Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
