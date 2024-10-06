import { IconProps } from './Icon.interface';

export const IconArrowUpDown: React.FC<IconProps> = (props) => (
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
      d='M7.32173 16.8477V5H8.17695V16.8479L10.8943 14.3092L11.4987 14.8737L7.74959 18.3768L4 14.8737L4.60464 14.3092L7.32173 16.8477ZM12 8.50287L15.7493 5L19.4987 8.50287L18.894 9.0678L16.1767 6.52868V18.3768H15.3217V6.52891L12.6046 9.0678L12 8.50287Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
