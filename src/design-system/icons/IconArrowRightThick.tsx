import { IconProps } from './Icon.interface';

export const IconArrowRightThick: React.FC<IconProps> = (props) => (
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
      d='M13.4697 5.96967C13.1768 6.26256 13.1768 6.73744 13.4697 7.03033L17.6893 11.25L4.5 11.25C4.08579 11.25 3.75 11.5858 3.75 12C3.75 12.4142 4.08579 12.75 4.5 12.75L17.6893 12.75L13.4697 16.9697C13.1768 17.2626 13.1768 17.7374 13.4697 18.0303C13.7626 18.3232 14.2374 18.3232 14.5303 18.0303L20.0303 12.5303C20.3232 12.2374 20.3232 11.7626 20.0303 11.4697L14.5303 5.96967C14.2374 5.67678 13.7626 5.67678 13.4697 5.96967Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
