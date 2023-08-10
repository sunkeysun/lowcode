import { ButtonProps, Button as OriginButton } from 'antd';
import { forwardRef } from 'react';

export const Button = forwardRef<HTMLElement, ButtonProps>(function (props, ref) {
  const { slot } = props
  return <OriginButton {...props} ref={ref}>{slot}</OriginButton>
})
