import { forwardRef } from 'react'

const Form = forwardRef<HTMLFormElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <form ref={ref} style={{ width: 100, height: 100, background: 'green' }}>
        表单{children}
      </form>
    )
  },
)

export { Form }
