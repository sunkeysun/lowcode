import { forwardRef } from 'react'
import { Input as AntdInput } from 'antd'

export const Input = forwardRef((props, ref) => {
  return <AntdInput {...props} ref={(inputRef) => ref(inputRef?.input) } />
})
