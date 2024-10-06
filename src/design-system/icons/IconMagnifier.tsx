import { IconProps } from './Icon.interface';

export const IconMagnifier: React.FC<IconProps> = (props) => (
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
      d='M14.6877 15.4653C13.5564 16.4204 12.0945 16.9961 10.498 16.9961C6.90927 16.9961 4 14.0868 4 10.498C4 6.90927 6.90927 4 10.498 4C14.0868 4 16.9961 6.90927 16.9961 10.498C16.9961 12.0945 16.4204 13.5564 15.4653 14.6877L19.839 19.0614C20.0537 19.2761 20.0537 19.6242 19.839 19.839C19.6242 20.0537 19.2761 20.0537 19.0614 19.839L14.6877 15.4653ZM10.498 15.9964C13.5347 15.9964 15.9964 13.5347 15.9964 10.498C15.9964 7.46139 13.5347 4.9997 10.498 4.9997C7.46139 4.9997 4.9997 7.46139 4.9997 10.498C4.9997 13.5347 7.46139 15.9964 10.498 15.9964Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
