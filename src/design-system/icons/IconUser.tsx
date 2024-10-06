import { IconProps } from './Icon.interface';

export const IconUser: React.FC<IconProps> = (props) => (
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
      d='M15.201 7.25C15.201 9.00723 13.771 10.4375 11.9999 10.4375C10.2289 10.4375 8.79893 9.00723 8.79893 7.25C8.79893 5.49277 10.2289 4.0625 11.9999 4.0625C13.771 4.0625 15.201 5.49277 15.201 7.25ZM16.2635 7.25C16.2635 9.59721 14.3546 11.5 11.9999 11.5C9.64527 11.5 7.73643 9.59721 7.73643 7.25C7.73643 4.90279 9.64527 3 11.9999 3C14.3546 3 16.2635 4.90279 16.2635 7.25ZM19.4328 20C19.1122 16.7793 16.3946 14.2642 13.0895 14.2642H10.9104C7.60533 14.2642 4.88768 16.7793 4.56706 20H3.5C3.82415 16.1916 7.01812 13.2017 10.9104 13.2017H13.0895C16.9818 13.2017 20.1757 16.1916 20.4999 20H19.4328Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
