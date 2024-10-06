import { IconProps } from './Icon.interface';

export const IconArrowRight: React.FC<IconProps> = (props) => (
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
      d='M13.6464 6.14645C13.4512 6.34171 13.4512 6.65829 13.6464 6.85355L18.2929 11.5H4.5C4.22386 11.5 4 11.7239 4 12C4 12.2761 4.22386 12.5 4.5 12.5H18.2929L13.6464 17.1464C13.4512 17.3417 13.4512 17.6583 13.6464 17.8536C13.8417 18.0488 14.1583 18.0488 14.3536 17.8536L19.8536 12.3536C20.0488 12.1583 20.0488 11.8417 19.8536 11.6464L14.3536 6.14645C14.1583 5.95118 13.8417 5.95118 13.6464 6.14645Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
