import { IconProps } from './Icon.interface';

export const IconArrowLeft: React.FC<IconProps> = (props) => (
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
      d='M10.3536 6.14645C10.5488 6.34171 10.5488 6.65829 10.3536 6.85355L5.70711 11.5H19.5C19.7761 11.5 20 11.7239 20 12C20 12.2761 19.7761 12.5 19.5 12.5H5.70711L10.3536 17.1464C10.5488 17.3417 10.5488 17.6583 10.3536 17.8536C10.1583 18.0488 9.84171 18.0488 9.64645 17.8536L4.14645 12.3536C3.95118 12.1583 3.95118 11.8417 4.14645 11.6464L9.64645 6.14645C9.84171 5.95118 10.1583 5.95118 10.3536 6.14645Z'
      fill='currentColor'
      fillRule='evenodd'
    />
  </svg>
);
