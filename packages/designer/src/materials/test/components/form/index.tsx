import { forwardRef } from 'react'

export const Form = forwardRef(({ children }, ref) => {
  return <form ref={ref} style={{ width: 50, height: 50, background: 'green' }}>表单{children}</form>
})
