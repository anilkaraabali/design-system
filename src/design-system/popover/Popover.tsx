import { forwardRef } from 'react';

export interface PopoverProps extends React.ComponentPropsWithRef<'div'> {
  as?: React.ElementType;
}

export const Popover = forwardRef<HTMLElement, PopoverProps>(
  ({ as: Component = 'div', children, ...rest }, ref) => (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  )
);
