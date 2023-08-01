import { forwardRef } from 'react'

export const Form = forwardRef(({ children }, ref) => {
  return <form ref={ref} style={{ width: 100, height: 100, background: 'green' }}>表单{children}</form>
})
